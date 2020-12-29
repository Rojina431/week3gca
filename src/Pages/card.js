import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import { CardActions, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {useHistory} from 'react-router-dom';
import { useState,useEffect } from 'react';
import { deleteNotes, getNotes } from './function';
const useStyles=makeStyles({
    root:{
        width:"90%",
        marginTop:30,
        marginLeft:'5%', 
        marginRight:"5%"
    },
    icon:{
        margin:20,
        color:"green",
    },
    icon_red:{
        color:"red",
    }
})
export default function CardPage(){
    var classes=useStyles();
    var history=useHistory();

    const [notes,setNotes]=useState(" ")
    const [isLoading,setIsLoading]=useState(true)

    useEffect(()=>{
        getNotes().then((res)=>(
            setNotes(res),
            setIsLoading(false)
        ))
    },[]
    )

     const handleClick=(id,status)=>{
       if(status==="delete"){
           deleteNotes(id).then(()=>{
               getNotes().then((res)=>(
                setNotes(res),
                setIsLoading(false)
            ))
           });
        }
    }
    return(
        <div>
           {isLoading?<p>Please wait,your notes are loading..</p>:notes==""?<p style={{textAlign:"center"}}><strong>No notes written</strong></p>:notes.map((note,index)=>
               <Card className={classes.root} key={index}>
               <CardHeader
                title={note.data().title}
                subheader={new Date().toDateString()}
               />
               <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                 {note.data().desc}
                </Typography>
              </CardContent>
              <CardActions>
                  <IconButton  onClick={()=>history.push(`/add/${note.id}`,{notes:note.data()})}>
                  <EditIcon className={classes.icon}/>
                  </IconButton>
                  <IconButton onClick={()=>handleClick(note.id,"delete")}>
                  <DeleteIcon className={classes.icon_red}/>
                  </IconButton>
              </CardActions>
             </Card> 
           )} 
           </div>
    )
}