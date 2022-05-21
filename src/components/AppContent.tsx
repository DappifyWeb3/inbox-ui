import React, { useState } from "react";
import styled from "styled-components";
import {
  Box,
  IconButton,
  MenuItem,
  Checkbox,
  ListItemIcon,
  makeStyles,
} from "@material-ui/core";
import MoreVert from "@material-ui/icons/MoreVert";
import Refresh from "@material-ui/icons/Refresh";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Settings from "@material-ui/icons/Settings";
import Keyboard from "@material-ui/icons/Keyboard";
import Edit from "@material-ui/icons/Edit";
import Inbox from "@material-ui/icons/Inbox";
import LocalOffer from "@material-ui/icons/LocalOffer";
import People from "@material-ui/icons/People";
import Info from "@material-ui/icons/Info";
import { useSizedIconButtonStyles } from "@mui-treasury/styles/iconButton/sized";
import { useRowGutterStyles } from "@mui-treasury/styles/gutter/row";
import ArrowMenu from "@mui-treasury/components/menu/arrow";
import { GmailTabs, GmailTabItem } from "@mui-treasury/components/tabs/gmail";
import MailListItem from "./MailListItem";
import { useMoralis, useMoralisQuery } from 'react-moralis';
import moment from 'moment';
import ViewModal from 'components/ViewModal';
import { useEffect } from "react";

const Div = styled("div")`
  height: 48px;
  padding: 0 16px;
  box-shadow: inset 0 -1px 0 0 rgba(100, 121, 143, 0.122);
  display: flex;
  align-items: center;
`;

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 14,
    paddingLeft: 32,
    width: 160,
  },
}));

const useCheckboxStyles = makeStyles(({ palette }) => ({
  checked: {
    color: palette.text.primary,
  },
}));

const AppContent = () => {
  const { Moralis, user, isAuthenticated } = useMoralis();
  const [page, setPage] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(moment());
  const [openViewModal, setOpenViewModal] = useState({
    subject: '',
    sender: '',
    content: '',
    id: ''
  });
  const [limit, setLimit] = useState(25);

  const { data:inbox, error, isLoading } = useMoralisQuery("Message",   query =>
  query
    .equalTo("recipient", user?.get('ethAddress'))
    .equalTo("tag", null)
    .equalTo("deleted", false)
    .skip(page*limit)
    .withCount()
    .descending('createdAt')
    .limit(limit),
    [isAuthenticated, page, lastUpdated],);

    const { data:unread } = useMoralisQuery("Message",   query =>
    query
      .equalTo("recipient", user?.get('ethAddress').toLowerCase())
      .equalTo("read", false)
      .equalTo("deleted", false)
      .skip(page*limit)
      .withCount()
      .descending('createdAt')
      .limit(limit),
      [isAuthenticated, page, lastUpdated],);

  const noData = !isLoading && inbox['count'] === 0;
  // console.log(noData);

  const sendWelcome = async() => {
    const Message = Moralis.Object.extend("Message");
    const message = new Message();
    message.set('title', 'Welcome to Web3 Inbox');
    message.set('description', 'With Web3 inbox you can send emails to 0x addresses, we are looking for feedback to iterate on the prototype so feel free to join our discord from https://dappify.com');
    message.set('recipient', user?.get('ethAddress').toLowerCase())
    message.set("sender", 'Dappify');
    message.set('starred', true);
    message.save();
  };

  useEffect(() => {
    if (noData) {
      console.log("Send welcome email");
      sendWelcome();
    }
  }, [noData])

  const mailList = inbox['results'] || [];
  const mailCount = inbox['count'] || 0;

  const unreadList = unread['results'] || [];
  const unreadCount = unread['count'] || [];


  const actionStyles = useSizedIconButtonStyles({ padding: 8, childSize: 20 });
  const gutterStyles = useRowGutterStyles({ size: "0.25rem" });
  const menuItemClasses = useStyles();
  const checkboxClasses = useCheckboxStyles();
  const [index, setIndex] = React.useState(0);

  const isLastPage = page*limit+limit >= mailCount;

  const props = {
    mail: openViewModal,
    onClose: (e: React.MouseEvent) => {
      setOpenViewModal({
        subject: '',
        sender: '',
        content: '',
        id: ''
      });
    }
  }

  return (
    <>
      <Div>
        <Box display="inline-flex" className={gutterStyles.parent}>
          {/*<ArrowMenu
            renderElement={({ styles, onClose }) => (
              <Checkbox
                classes={checkboxClasses}
                className={styles.button}
                color={"default"}
                onChange={onClose}
              />
            )}
          >
            <MenuItem classes={menuItemClasses}>All</MenuItem>
            <MenuItem classes={menuItemClasses}>None</MenuItem>
            <MenuItem classes={menuItemClasses}>Read</MenuItem>
            <MenuItem classes={menuItemClasses}>Unread</MenuItem>
            </ArrowMenu> */}
           {/*<IconButton classes={actionStyles}>
            <Refresh />
          </IconButton> */}
          {/*<IconButton classes={actionStyles}>
            <MoreVert />
          </IconButton>*/}
        </Box>
        <Box
          display="inline-flex"
          alignItems="center"
          ml="auto"
          className={gutterStyles.parent}
        >
          <Box fontSize={12} color="text.secondary">
            {`${page*limit}-${Math.min(page*limit+limit, mailCount)} of ${mailCount}`}
          </Box>
          <IconButton disabled={page === 0} classes={actionStyles}  onClick={() => setPage(page-1)}>
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton disabled={isLastPage} classes={actionStyles} onClick={() => setPage(page+1)}>
            <KeyboardArrowRight />
          </IconButton>
          {/*<ArrowMenu
            renderElement={({ styles, onClose }) => (
              <IconButton
                className={styles.button}
                color={"default"}
                onChange={onClose}
              >
                <Keyboard />
              </IconButton>
            )}
          >
            <MenuItem classes={menuItemClasses}>
              <ListItemIcon style={{ minWidth: 32 }}>
                <Edit fontSize={"small"} />
              </ListItemIcon>
              English
            </MenuItem>
          </ArrowMenu>
          <IconButton classes={actionStyles}>
            <Settings />
            </IconButton> */}
        </Box>
      </Div>
      <GmailTabs value={index} onChange={(_, value) => setIndex(value)}>
        <GmailTabItem 
          icon={<Inbox />} 
          label={"Inbox"} 
          color={"secondary"}
          tag={unreadCount > 0 ? `${unreadCount} new` : ''}
        />
        {/*<GmailTabItem
          icon={<People />}
          label={"Social"}
          tag={"2 new"}
          subLabel={"Youtube, LinkedIn"}
        />
        <GmailTabItem
          icon={<LocalOffer />}
          label={"Applications"}
          subLabel={"Pattern Matching, Medium Daily"}
            />*/}
        {/*<GmailTabItem icon={<Info />} label={"Updates"} tag={"15 new"} />*/}
      </GmailTabs>
      <ViewModal {...props} />
      {!isAuthenticated && noData && (
        <div style={{
          width: '100%',
          padding: 50,
          textAlign: 'center',
          margin: '0 auto',
          fontSize: '2em',
          opacity: 0.75,
          fontWeight: '200'
        }}>
          Please connect your wallet to send and receive Web3 emails using 0x addresses
        </div>
      )}
      {mailList.map((mail: any, i: number) => {
        const isRead = mail.get('read');
        const sender = isRead?  <div>{mail.get('sender')}</div> : <b><div>{mail.get('sender')}</div></b>;
        const title = isRead?  <div>{mail.get('title')}</div> : <b><div>{mail.get('title')}</div></b>;
        const content = isRead?  <div>{mail.get('description')}</div> : <b><div>{mail.get('description')}</div></b>;
        const mailItem = {
          read: mail.get('read'),
          initialStarred: mail.get('starred'),
          initialLabeled: mail.get('labeled'),
          sender: sender,
          title: title,
          description: content,
          date: moment(mail.get('createdAt')).format('llll'),
          onClick: async () => {
            mail.set('read', true);
            await mail.save();
            setLastUpdated(moment());
            setOpenViewModal({
              subject: mail.get('title'),
              sender: mail.get('sender'),
              content: mail.get('description'),
              id: mail.id
            });
          },
          onDeleted: async () => {
            mail.set('deleted', true);
            await mail.save();
            setLastUpdated(moment());
          },
          onStarred: async () => {
            mail.set('starred', true);
            await mail.save();
            setLastUpdated(moment());
          },
          onRead: async () => {
            mail.set('read', true);
            await mail.save();
            setLastUpdated(moment());
          }
        }
        return (<MailListItem key={i} {...mailItem} />)
      })}
    </>
  );
};

export default AppContent;
