import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';


library.add(faMailBulk, faLock, faEnvelope);

export default {
  email: faEnvelope,
  password: faLock,
  mail: faMailBulk,
  user: faUser,
  userPlus: faUserPlus,
  signInAlt: faSignInAlt,
  warning: faWarning,
  userSecret: faUserSecret,
  userCircle: faUserCircle,
  userCheck: faUserCheck,
  hamburger: faHamburger,
  add: faAdd,
  edit: faEdit,
  trashAlt: faTrashAlt,
  eye: faEye,
  eyeSlash: faEyeSlash,
  peopleGroup: faPeopleGroup,
  search: faSearch,
  close: faClose,
  trash: faTrash,
  refresh: faRefresh,
  bars: faBars,
  gripVertical: faGripVertical

}