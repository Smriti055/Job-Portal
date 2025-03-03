**Job Junction – MERN Stack Job Portal**
**🚀 A full-stack job portal that connects job seekers with employers, allowing efficient job applications, tracking statuses, and filtering job listings.**

**Features**
**For Job Seekers:**
✅ Apply to multiple job listings
✅ Track application status (Accepted/Rejected/Pending)
✅ Filter jobs by location and salary
✅ Secure authentication with JWT
✅ Upload resumes

**For Employers/Admins:**
✅ Post job listings for various companies
✅ Track and manage user applications
✅ Update application status (Accept/Reject/Pending)
✅ Role-based access control

**🔹 Tech Stack**
**Frontend:**
React.js – UI Development
Redux – State Management
Tailwind CSS – Styling
Axios – API Requests
**Backend:**
Node.js & Express.js – REST API Development
MongoDB – Database for jobs, users, and applications
JWT Authentication – Secure user login
Multer & Cloudinary – Resume file uploads

🔹 Installation & Setup
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/job-junction.git
cd job-junction
2️⃣ Backend Setup
bash
Copy
Edit
cd backend
npm install
Create a .env file in the backend folder and add:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Start the backend server:

bash
Copy
Edit
npm run dev
3️⃣ Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
Start the frontend:
bash
Copy
Edit
npm run dev
