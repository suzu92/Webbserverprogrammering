import DataCard from "./DataCard";

const DataItems = ({task}) => {
    return (
        <>
            {
                task.map((item, index)=> {
                    return (
                        <DataCard key={index}
                                  id={item.id}
                                  name={item.name}
                                  todo={item.todo}/>
                    )
                })
            }
        </>
    )
}

export default DataItems