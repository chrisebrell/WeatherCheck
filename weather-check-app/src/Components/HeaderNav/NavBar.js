//NavBar Component - used for redirecting people to different pages. these different pages will be displayed in the "main" component

//DEPENDENCIES
import './header-styles.css'

//For temporary use, there are a hrefs that doesn't lead to any links, but these will be replaced with <Route> later
function NavBar() {
    return (
        <div className="nav header">
            <a href="">Logo</a>
            <a href="">Home</a>
            <a href="">About</a>
            <a href="">Forecast</a>
            <a href="">Suggestions</a>
            <a href="">Profile</a>
        </div>
    )
}




export default NavBar