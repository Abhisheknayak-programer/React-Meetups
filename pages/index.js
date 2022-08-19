import React from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const AllMeetups = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Meetups Website for the people all over the INDIA!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </React.Fragment>
  );
};

export async function getStaticProps() {
  // Fetch Some Meetups List From The Database
  const client = await MongoClient.connect(
    "mongodb+srv://abhishek:abhishek1234@cluster0.as3ea.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollections = db.collection("meetups");
  const meetupsData = await meetupsCollections.find().toArray();

  const tranformedMeetups = meetupsData.map((meetup) => ({
    title: meetup.title,
    image: meetup.image,
    address: meetup.address,
    description: meetup.description,
    id: meetup._id.toString(),
  }));

  client.close();

  return {
    props: {
      meetups: tranformedMeetups,
    },
    revalidate: 10,
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // Fetch Some Data From The Server

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default AllMeetups;
