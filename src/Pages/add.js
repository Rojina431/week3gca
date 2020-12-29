import { Button, Grid, TextField } from "@material-ui/core";
import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import firebase from 'firebase';
import { withRouter} from 'react-router-dom';

function AddPage(props){
  const[title,setTitle]=useState(" ");
  const[desc,setDesc]=useState(" ");
  const [titleDefault,setTitleDefault]=useState(" ")
  const [descDefault,setDescDefault]=useState(" ")
  const [isLoading,setIsLoading]=useState(true)
  const [isDisable,setIsDisable]=useState(false)
  const history=useHistory();

  useEffect(()=>{
    if(props.match.params.id){
      setTitle(props.history.location.state.notes.title);
      setDesc(props.history.location.state.notes.desc)
      setIsLoading(false)
    }else{
      setTitle(" ");
      setDesc(" ");
      setIsLoading(false);
    }
  },[])

    const handleChange=(e)=>{
      if(e.target.id==="title"){
        setTitle(e.target.value);
      }else if(e.target.id==="notes"){
        setDesc(e.target.value);
      }
    }

    const handleClick=async ()=>{
      setIsDisable(true)
      if(props.match.params.id){
        let id=props.match.params.id
        await firebase.firestore().collection("notes").doc(id).update({
          title:title,
          desc:desc,
          note_id:new Date().toISOString()
        }).then(()=>(
          history.push('/')
        ))
        .catch((err)=>console.log(err))
      }else{
        await firebase.firestore().collection("notes").add({
          title:title,
          desc:desc,
          note_id:new Date().toISOString()
        }).then(()=>(
          history.push('/')
        ))
        .catch((err)=>console.log(err))
      }
    }

    return(
        <div>
            <h5 style={{textAlign:"center",fontSize:20,color:"coral"}}>Add Notes</h5>
            {!isLoading?<Grid container spacing={3} style={{margin:3}}>
                    <Grid item xs={11} sm={11}>
                      <TextField
                      id="title"
                      value={title}
                      label="Enter Title"
                      variant="outlined"
                      color="secondary"
                      placeholder="Enter Title"
                      helperText="Please Enter Your Notes Title"
                      error={false}
                      disabled={isDisable}
                      onChange={handleChange}
                      fullWidth={true}/>
                    </Grid>
                    <Grid  item xs={11} sm={11}>
                      <TextField
                      id="notes"
                      label="Enter Notes"
                      variant="outlined"
                      color="secondary"
                      placeholder="Enter Notes"
                      value={desc}
                      helperText="Please Write Notes Here"
                      error={false}
                      disabled={isDisable}
                      multiline
                      rows={3}
                      rowsMax={5}
                      onChange={handleChange}
                      fullWidth={true}/>
                    </Grid>
            </Grid>:<p>Loading...</p>}
            <Button style={{backgroundColor:"cornflowerblue",margin:10}} onClick={handleClick}>Save</Button>
        </div>
    )
}

export default withRouter(AddPage);