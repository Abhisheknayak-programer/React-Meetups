import React from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetUpDetails from "../../components/meetups/MeetupsDetails";

const MeetupDetailsComponent = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>{props.meetupDetails.title}</title>
        <meta name="description" content={props.meetupDetails.description} />
      </Head>
      <MeetUpDetails
        image={props.meetupDetails.image}
        description={props.meetupDetails.description}
        title={props.meetupDetails.title}
        address={props.meetupDetails.address}
      />
    </React.Fragment>
  );
};

export async function getStaticPaths() {
  // FETCH ALL MEETUPID DATA FROM THE DATABASE FOR
  const client = await MongoClient.connect(
    "mongodb+srv://abhishek:abhishek1234@cluster0.as3ea.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetupsData = await meetupsCollection.find({}, { _id: 1 }).toArray();
  const transfomedPaths = meetupsData.map((meetup) => ({
    params: { meetupId: meetup._id.toString() },
  }));

  client.close();

  return {
    fallback: "blocking",
    paths: transfomedPaths,
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  // FETCH SOME DATA FROM THE DATABASE FOR MEETUPID SPECIFICALLY
  const client = await MongoClient.connect(
    "mongodb+srv://abhishek:abhishek1234@cluster0.as3ea.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetupData = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupDetails: {
        image: meetupData.image,
        title: meetupData.title,
        description: meetupData.description,
        id: meetupData._id.toString(),
        address: meetupData.address,
      },
    },
  };
}

export default MeetupDetailsComponent;
