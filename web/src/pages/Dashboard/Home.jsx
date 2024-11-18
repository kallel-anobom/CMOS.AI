import { useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import { ProjectsContext } from "../../contexts/ProjectsContext";
// import { TasksContext } from "../../contexts/TasksContext";

export function Home() {
    const { projects } = useContext(ProjectsContext);
  // const { tasks } = useContext(TasksContext);
  console.log('AQUIIIII')
  console.log(projects)
  return (
    <section className="grid h-screen place-items-center p-4">
    <Card className="w-auto max-w-[24rem]">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-medium"
        >
          Enterprise
        </Typography>
        <Typography
          color="blue-gray"
          className="mt-1 mb-2 text-[20px] font-bold"
        >
          Autodesk looks to future of 3D printing with Project Escher
        </Typography>
      </CardHeader>
      <CardBody className="px-4 pt-0">
        <Typography className="font-normal text-gray-600">
          I will be the leader of a company that ends up being worth billions
          of dollars, because I got the answers. I understand culture. I am
          the nucleus.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 px-4">
        <Button>read more</Button>
      </CardFooter>
    </Card>
  </section>
  );
}

export default Home;