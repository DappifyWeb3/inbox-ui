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

export type MailAttrs = {
  subject: string,
  sender: string,
  content: string,
  id: string
};

export type ViewModalProps = {
  mail?: MailAttrs;
  onClose?: React.MouseEventHandler;
};

const ViewModal = ({mail, onClose}: ViewModalProps) => {
  const classes = useStyles();
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const shouldOpen = mail ? mail?.id?.length > 0 : false;
  return (
      <Dialog fullScreen open={shouldOpen} onClose={onClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {mail?.subject}
            </Typography>
          </Toolbar>
        </AppBar>
        <TextField
          id="sender"
          disabled
          InputProps={{
            startAdornment: <InputAdornment position="start">Sender:</InputAdornment>
          }}
          style={{
            padding: '20px'
          }}
          value={mail?.sender}
        />
        <TextField
          id="subject"
          disabled
          InputProps={{
            startAdornment: <InputAdornment position="start">Subject:</InputAdornment>,
          }}
          style={{
            padding: '20px'
          }}
          value={mail?.subject}
        />
        <TextField
          id="content"
          disabled
          multiline={true}
          style={{
            padding: '20px'
          }}
          value={mail?.content}
        />
      </Dialog>
  );
}

export default ViewModal;