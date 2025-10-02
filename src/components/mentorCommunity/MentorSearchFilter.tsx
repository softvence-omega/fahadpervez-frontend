import { Search } from "lucide-react"

const MentorSearchFilter = () => {
  return (
    <div className=" bg-white rounded-lg shadow-sm p-4 h-fit sticky top-28 w-full">
      <h3 className="font-semibold text-gray-900 mb-4">Search & Filter</h3>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by type</label>
          <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Posts</option>
            <option>Questions</option>
            <option>Discussions</option>
            <option>Resources</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default MentorSearchFilter;
