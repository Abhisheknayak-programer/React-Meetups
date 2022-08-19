import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetup = () => {
  const router = useRouter();

  const NewMeetupAddedHandler = async (MeetUpData) => {
    // Absolute Path
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(MeetUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    router.push("/");
  };

  return (
    <React.Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add some new awesome meetups for better networking!"
        />
      </Head>
      <NewMeetupForm onAddMeetup={NewMeetupAddedHandler} />
    </React.Fragment>
  );
};

export default NewMeetup;
