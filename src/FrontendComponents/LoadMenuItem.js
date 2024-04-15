import MenuItems from "./MenuItem";


function LoadMenuItems(props){

    //map function - Reference: Martin Kenirons notes from Data Representation and querying
    //map over the array of menu items and make a component for each one
    return props.myMenuItems.map(
        //pass the individual menu item
        //There is functions attached to it
        //Reload is for when you do something like delete a menu item, the cards reflect that wirhout needing to refresh the page manually
        //OnItemClick is for adding to days of the week by clicking on the card
        //onRemove is for removing an item from a day of the week without deleting from database
        (item)=>{
            return <MenuItems myMenuItem={item} key={item._id} 
            onClick={() =>{props.onItemClick(item._id)}}
             Reload={()=>{props.ReloadData()}}
             onRemove={() => props.onRemoveItem(item._id)}
            isInDay={true}
             ></MenuItems>
        }
    );
}

export default LoadMenuItems;