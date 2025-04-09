const FilterBar = ({ courses, subs, years, filters, onFilterChange }) => {
    return (
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Filter Notes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
              Course
            </label>
            <select
              id="course"
              name="course"
              value={filters.course}
              onChange={onFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            >
              <option value="">All Courses</option>
              
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
  
          <div>
            <label htmlFor="sub" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              id="sub"
              name="sub"
              value={filters.sub}
              onChange={onFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            >
              <option value="">All Subjects</option>
              {subs.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
  
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <select
              id="year"
              name="year"
              value={filters.year}
              onChange={onFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            >
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
  
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search notes..."
              value={filters.search}
              onChange={onFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default FilterBar;