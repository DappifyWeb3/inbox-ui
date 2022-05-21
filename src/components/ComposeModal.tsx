import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { TextField, InputAdornment, Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export type ComposeModalProps = {
  isOpen?: boolean;
  onClose?: React.MouseEventHandler;
  onSubmit: Function;
};

export type MailMessage = {
  recipients: Array<string>,
  subject: string,
  content: string
}


const ComposeModal = ({isOpen=false, onClose, onSubmit}: ComposeModalProps) => {
  const classes = useStyles();
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const onSend = () => {
    onSubmit({
      recipients: recipients.trim().split(','),
      subject: subject,
      content: content
    });
  }
  return (
      <Dialog fullScreen open={isOpen} onClose={onClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Compose New Message
            </Typography>
            <Button autoFocus color="inherit" onClick={onSend}>
              Send
            </Button>
          </Toolbar>
        </AppBar>
        <TextField
          id="recipients"
          autoFocus={true}
          InputProps={{
            startAdornment: <InputAdornment position="start">Recipients (comma separated):</InputAdornment>
          }}
          style={{
            padding: '20px'
          }}
          onChange={(e) => setRecipients(e.target.value)}
        />
        <TextField
          id="subject"
          InputProps={{
            startAdornment: <InputAdornment position="start">Subject:</InputAdornment>,
          }}
          style={{
            padding: '20px'
          }}
          onChange={(e) => setSubject(e.target.value)}
        />
        <TextField
          id="content"
          multiline={true}
          style={{
            padding: '20px'
          }}
          onChange={(e) => setContent(e.target.value)}
        />
      </Dialog>
  );
}

export default ComposeModal;