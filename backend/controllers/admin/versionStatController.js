const Project = require('../../models/Project');
const VersionHistory = require('../../models/VersionHistory');
const ArchivedProject = require('../../models/ArchivedProject');
const mongoose = require('mongoose');

const getVersionStatistics = async (req, res) => {
	//const { ver } = req.params;
	// if (!ver) return res.status(400).json({ message: 'version number is required' });
	// const version = parseInt(ver);
	// if (isNaN(version)) return res.status(400).json({ message: 'invalid version number' });
	
	// const foundVersion = await VersionHistory.findOne({ version });
	// if (!foundVersion) return res.status(404).json({
	//	message: `version ${ver} does not exist`
	// });
	
	try {
		const versions = await VersionHistory.find().sort({ version: 1 });
		const versionStat = await Promise.all(versions.map(async (version) => {
			const allArchivedProjects = await ArchivedProject.find({ version: version.version });
			if (allArchivedProjects.length === 0) {
				return {
					version: version.version,
					title: version.title,
					createdBy: version.createdBy,
					createdAt: version.createdAt,
					endedAt: null,
					topPerformers: [],
					totalProjects: 0,
					totalUsers: 0
		    };
			}
		
			const totalProjects = allArchivedProjects.reduce(
				(acc, project) => acc + project.projects.length, 0
			)
			
			const versionArchivedAt = allArchivedProjects.reduce((latest, project) => {
				return project.archivedAt > latest ? project.archivedAt : latest;
			}, allArchivedProjects[0].archivedAt);
			
			const topPerformersData = await ArchivedProject.aggregate([
				{ 
					$match: { version: version.version }
				},
				{
					$addFields: {
						projectCount: { $size: "$projects" }
					}
				},
				{
					$sort: { projectCount: - 1 }
				},
				{
					$limit: 3
				}
			]);
			
			const topPerformers = topPerformersData.map((user) => ({
				username: user.username,
				projectCount: user.projectCount,
				percentage: ((user.projectCount / totalProjects) * 100).toFixed(2) + '%'
			}));
			
			return{
				version: version.version,
				title: version.title,
				createdBy: version.createdBy,
				createdAt: version.createdAt,
				endedAt: versionArchivedAt,
				topPerformers: topPerformers,
				totalProjects: totalProjects,
				totalUsers: allArchivedProjects.length
			}
		}));
	  
		res.status(200).json(versionStat);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Internal server error' });
	}
}

module.exports = { getVersionStatistics }