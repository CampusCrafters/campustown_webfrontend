import MyProjectCard from "@/components/MyProjectCard";
import { fetchMyProjects } from "@/redux/projectsActions";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MyListings = () => {
    const dispatch = useDispatch();

    const { myProjects } = useSelector(
      (state: RootState) => state.myProjects
    );
    const { searchQuery } = useSelector((state: RootState) => state.search);
  
    useEffect(() => {
      dispatch(fetchMyProjects() as any);
    }, [dispatch]);
  
    const filteredMyProjects = myProjects.filter((project) => {
      return project.project_title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
    const reversedMyProjects = [...filteredMyProjects].reverse();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {reversedMyProjects.map((project) => (
      <MyProjectCard
        key={`my-${project.project_id}`}
        project={project}
      />
    ))}
  </div>

  )
}

export default MyListings