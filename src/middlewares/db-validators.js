export const isAdmin = async (req, res, next) => {
	const curr = req.user;

	if (curr.role !== 'admin') {
		return res.status(401).json({
			msg: 'Only the admin can do this'
		});
	}

	next();
};