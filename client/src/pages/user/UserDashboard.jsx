import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/user/showDashboard");
      data.success
        ? setDashboardData(data.dashboardData)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-6 md:p-10 bg-blue-50 min-h-screen">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer">
          <img src={assets.dashboard_icon_1} alt="Blogs" className="w-10 h-10" />
          <div>
            <p className="text-2xl font-bold text-blue-700">{dashboardData.blogs}</p>
            <p className="text-gray-500 text-sm">Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer">
          <img src={assets.dashboard_icon_2} alt="Comments" className="w-10 h-10" />
          <div>
            <p className="text-2xl font-bold text-blue-700">{dashboardData.comments}</p>
            <p className="text-gray-500 text-sm">Comments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer">
          <img src={assets.dashboard_icon_3} alt="Drafts" className="w-10 h-10" />
          <div>
            <p className="text-2xl font-bold text-blue-700">{dashboardData.drafts}</p>
            <p className="text-gray-500 text-sm">Drafts</p>
          </div>
        </div>
      </div>

      {/* Recent Blogs Table */}
      <div>
        <div className="flex items-center gap-3 mb-4 text-gray-700">
          <img src={assets.dashboard_icon_4} alt="Latest Blogs" className="w-6 h-6" />
          <h3 className="text-lg font-semibold">Latest Blogs</h3>
        </div>

        <div className="relative max-w-5xl overflow-x-auto shadow rounded-lg bg-white">
          <table className="w-full text-sm text-gray-600">
            <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Blog Title</th>
                <th className="px-4 py-3 hidden sm:table-cell">Date</th>
                <th className="px-4 py-3 hidden sm:table-cell">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.length > 0 ? (
                dashboardData.recentBlogs.map((blog, index) => (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchDashboard}
                    index={index + 1}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No blogs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
