import { Fragment, useContext } from "react";
import NotificationContext from "../../store/notificationContext";

import MainHeader from "./MainHeader";

function Layout(props) {
  const { notification } = useContext(NotificationContext);
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
