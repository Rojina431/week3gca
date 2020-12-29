import firebase from 'firebase';

export async function getNotes(){
    const snapshot=await firebase.firestore().collection("notes").get();
    console.log(snapshot.docs.map(doc=>doc.id));
    return snapshot.docs.map(doc=>doc);
}

export async function deleteNotes(id){
    return await firebase.firestore().collection("notes").doc(id).delete();
}