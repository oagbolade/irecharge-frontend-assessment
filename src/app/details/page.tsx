import { DetailsCard } from "@/Components/DetailsCard";
import { Notes } from "@/Components/Notes";
import { Button } from "@mui/material";

export default function DetailsPage() {
  return (
    <div className="max-w-screen-lg mx-auto p-5 sm:p-10 md:p-16">
      <DetailsCard />
      <div className="container columns-2">
        <h2 className="font-bold text-xl">Notes</h2>
        <Button title="Add Note" />
      </div>
      <Notes />
      <Notes />
      <Notes />
      <Notes />
    </div>
  );
}
