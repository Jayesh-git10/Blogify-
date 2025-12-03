import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization; 
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Authorization token missing or invalid format" });
    }

    const token = authHeader.split(' ')[1]; 
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.role !== 'Admin') {
            return res.status(403).json({ success: false, message: "Access Denied: Not an Admin" });
        }
        
        req.user = decoded; 
        
        next();
        
    } catch (error) {
        return res.status(401).json({ success : false , message : "Invalid Token" });
    }
}

export default auth;