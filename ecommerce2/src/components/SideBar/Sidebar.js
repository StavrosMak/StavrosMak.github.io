import "./Sidebar.css"
import { useState, useEffect } from 'react';
import categories from "./sidebarCategories.json"

export default function Sidebar(props) {

    const [selectedCategories, setSelectedCategories] = useState([]); //selectedCategories used to check the sidebar checkboxes.
    const { onCategoryChange, toggleSidebar, showSidebar } = props;//destructuring assignment  
    useEffect(() => {
        
        const queryParams = new URLSearchParams(window.location.search);
        const categoryParam = queryParams.get('category');
        if (categoryParam) { //when i have parameters.
            // use the parameters.
            setSelectedCategories([categoryParam]);
            onCategoryChange([categoryParam]); //to pass the categoryChange back to productList
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleCheckboxChange = (event) => {

        const checkboxValue = event.target.value;
        const newSelectedCategories = selectedCategories.includes(checkboxValue)
            ? selectedCategories.filter(category => category !== checkboxValue)
            : [...selectedCategories, checkboxValue];

        // Update the selected categories and call the callback function
        setSelectedCategories(newSelectedCategories);
        onCategoryChange(newSelectedCategories);

        // Construct the new URL with the modified parameters
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set("category", newSelectedCategories.join(","));
        const newUrl = `${window.location.pathname}?${queryParams.toString()}`;

        // Update the URL
        window.history.pushState(null, '', newUrl);
    };

    return (
        <div className={`sidebarContainer ${showSidebar ? 'active' : ''}`}>
            <div className="sidebarContent">
                <h2>Categories</h2>
                <ul>
                    {categories.map((category) => (
                        <li className="categoryItem" key={category.id}>
                            <input aria-label="sidebar-Checkbox" type="checkbox" value={category.name}
                                checked={selectedCategories.includes(category.name)}
                                onChange={handleCheckboxChange}
                            />
                            <p>{category.label}</p>
                        </li>
                    ))}
                    <button className="saveBtn" onClick={toggleSidebar}>Save & Search</button>
                </ul>
            </div>
        </div>
    )
}