import './SearchBar.css';

function SearchBar(props) {
  const { statusSearch, activities, setActivities, closeSearchBar} = props;

  const filterActivities = (term) => {
    const filteredActivities = activities.filter(activity => {
      return activity.name.toLowerCase().includes(term.toLowerCase());
    });

    setActivities(filteredActivities);
  }

  const handleInputChange = (event) => {
    filterActivities(event.target.value);
  };
  
  return (
    <div className={`search-container ${statusSearch}`}><input onChange={handleInputChange} className="search-input" type="search"/><button onClick={closeSearchBar}>Close</button></div>
  );
}

export default SearchBar;