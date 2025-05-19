import CardItem from './CardItem'
import ChannelBreadcrumb from './ChannelBreadcrumb'
import ControlBox from './ControlBox'
import ControlBtn from './ControlBtn'
import FlexBox from './FlexBox'
import FlexItem from './FlexItem'
import ImageList from './ImageList'
import MyIcon from './MyIcon'
import OneLineText from './OneLineText'
import PageMain from './PageMain'
import QuickAssistant from './QuickAssistant'
import Row from './Row'
import TableImage from './TableImage'
import TableList from './TableList'
import TableSearch from './TableSearch'
import Tag from './Tag'
import Tip from './Tip'
import UpImg from './UpImg'
import VideoTool from './VideoTool'
import MarkEditor from './editor/MarkEditor'
import WangEditor from './editor/WangEditor'

const comps = [
  TableList,
  Row,
  ControlBox,
  ControlBtn,
  TableSearch,
  OneLineText,
  Tip,
  Tag,
  UpImg,
  ImageList,
  WangEditor,
  FlexBox,
  FlexItem,
  CardItem,
  PageMain,
  TableImage,
  MarkEditor,
  QuickAssistant,
  MyIcon,
  ChannelBreadcrumb,
  VideoTool
]

const install = (Vue, opts = {}) => {
  comps.forEach((component) => {
    Vue.component(component.name, component)
  })
}

export default {
  install,
  TableList,
  Row,
  ControlBox,
  ControlBtn,
  TableSearch,
  OneLineText,
  Tip,
  Tag,
  UpImg,
  ImageList,
  WangEditor,
  FlexBox,
  FlexItem,
  CardItem,
  PageMain,
  TableImage,
  MarkEditor,
  QuickAssistant,
  MyIcon,
  ChannelBreadcrumb,
  VideoTool
}
