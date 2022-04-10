import * as React from 'react';
import { useContext } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { ResultContext } from './InputForm';

const style = {
  width: '100%',
  maxWidth: 360,
  color: '#d8dfea',
  bgcolor: '#4267b2',
  overflowWrap: 'break-word' 
};

//  結果の金額を3桁コンマ区切りに変換する
const numberFormat = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};
//  受信した結果データを受け取って表示する
export default function ListDividers() {
  const resultdata =  useContext(ResultContext);

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem>
        <ListItemText primary={`資金が尽きる確率: ${resultdata.odds}%`} />
      </ListItem>
      <Divider />
      <ListItem divider>
        <ListItemText primary={`残った資金の平均結果: ${numberFormat(resultdata.average)}円`} />
      </ListItem>
      <ListItem>
        <ListItemText primary={`最小結果: ${numberFormat(resultdata.min)}円`} />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary={`最大結果: ${numberFormat(resultdata.max)}円`} />
      </ListItem>
    </List>
  );
}
