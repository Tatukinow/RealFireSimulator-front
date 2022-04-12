import { useState, useEffect, createContext } from 'react';
import { Button, Container, Grid, MenuItem, Stack, TextField } from '@mui/material'
import PulseLoader from "react-spinners/PulseLoader";
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import toast, { Toaster } from 'react-hot-toast';

import instance from "axios";
import Graph from './graph';
import ListDividers from './Result';

// 入力フォームと受信した結果データの型
interface FormInput {
  invest_type: string
  start_value: number
  withdrawal: number
  min_years: number
  most_likely_years: number
  max_years: number
}

interface Result {
  odds:number
  average:number
  min:number
  max:number
}

// State用初期値
const defaultpost = [0,0,0,0,0]
const defaultResult = {odds:0,
  average:0,
  min:0,
  max:0}
const defaultChart  = [0]

// 受信データをコンポーネントに受け渡す
export const ResultContext = createContext<Result>(defaultResult);
export const ChartContext = createContext<number[]>(defaultChart);


// 入力フォームのバリデーション
const schema = yup.object({
  
  invest_type: yup
    .string('リストから選択して下さい')
    .typeError('リストから選択して下さい')
    .required('リストから選択して下さい')
    .oneOf(['bonds', 'sp500', 'nikkei', 'gold'], 'リストから選択して下さい'),

  start_value: yup
    .number('数字で入力して下さい')
    .typeError('半角数字で入力して下さい')
    .integer('整数で入力して下さい')
    .positive('正の数で入力して下さい')
    .required('必須項目です'),

  withdrawal: yup
    .number('数字で入力して下さい')
    .typeError('半角数字で入力して下さい')
    .integer('整数で入力して下さい')
    .positive('正の数で入力して下さい')
    .required('必須項目です'),

  min_years: yup
    .number('数字で入力して下さい')
    .typeError('半角数字で入力して下さい')
    .integer('整数で入力して下さい')
    .positive('正の数で入力して下さい')
    .required('必須項目です')
    .max(99,'年数は99以下で入力して下さい'),

  most_likely_years: yup
    .number('数字で入力して下さい')
    .typeError('半角数字で入力して下さい')
    .integer('整数で入力して下さい')
    .positive('正の数で入力して下さい')
    .required('必須項目です')
    .max(99,'年数は99以下で入力して下さい')
    .test('most_likely_years', '最小年数以上の年数を入力して下さい',
    function (value:number) {
      if (value < this.parent.min_years) {
        return false;
      }
      return true;
    }),
 
  max_years: yup
    .number('数字で入力して下さい')
    .typeError('半角数字で入力して下さい')
    .integer('整数で入力して下さい')
    .positive('正の数で入力して下さい')
    .required('必須項目です')
    .max(99,'年数は99以下で入力して下さい')
    .test('max_years', '最頻年数以上の年数を入力して下さい',
    function (value:number) {
      if (value < this.parent.most_likely_years) {
        return false;
      }
      return true;
    }), 
})

function InputForm() {

// 受信データ用、Context用、スピナー用State
const [post, setPosts] = useState<number[]>(defaultpost);
const [result, setResult] = useState<Result>(defaultResult);
const [chartData, setChartData] = useState<number[]>(defaultChart);
const [progress, setProgress] =  useState(false); 

// 送信エラー時処理
const notifyError = () => toast.error('データ送信に失敗しました。少し時間をおいて再送信して下さい。');

const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({ defaultValues: {
      invest_type: "nikkei",
      start_value: 50000000,
      withdrawal: 2000000,
      min_years: 30,
      most_likely_years: 40,
      max_years: 50
    },
    resolver: yupResolver(schema),
  })

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    setProgress(true);
    instance.post("https://d8vegaaivg.ap-northeast-1.awsapprunner.com/fire/", data).then((res: any) => {
        setPosts(res.data);
      })
      .catch((err:any) => {
        notifyError();
        console.log(err);
      })
      .then(() => {
        setProgress(false);
      });
    };

//  受信データの中身を分けて整理する
//  受信データ用Stateが更新完了してからContext用Stateへデータが渡されるように更新タイミングを設定 
useEffect(() => {
    const [odds, average, min, max, ...graphdata] = post;
    const resultdata = {odds, average, min, max};
    setResult(resultdata);
    setChartData(graphdata);
  },[post])
   
  return (
      
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Toaster position="top-right"/>
      <Stack spacing={2}>
        <Controller
            control={control}
            name="invest_type"
            render={({ field }) => (
              <TextField
                {...field}
                label="投資対象"
                select
                required
                type="invest_type"
                error={'invest_type' in errors}
                helperText={errors.invest_type?.message}
               > 
                <MenuItem value="nikkei">日経平均株価</MenuItem>
                <MenuItem value="sp500">米国株SP500</MenuItem>
                <MenuItem value="bonds">米国10年国債</MenuItem>
                <MenuItem value="gold">金投資</MenuItem>
              </TextField>
            )}
         />
        <Controller
            control={control}
            name="start_value"
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="投資の初期資金"
                type="start_value"
                error={'start_value' in errors}
                helperText={errors.start_value?.message}
                placeholder="例:50000000(半角数字)"
                inputMode='tel'
              />
            )}
         />
        <Controller
            control={control}
            name="withdrawal"
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="年間の生活費"
                type="withdrawal"
                error={'withdrawal' in errors}
                helperText={errors.withdrawal?.message}
                placeholder="例:2000000(半角数字)"
                inputMode='tel'
              />
            )}
         />
    <Grid container rowSpacing={{ xs: 2, sm: 0 }}>
      <Grid item xs={12} sm ={4}>
        <Controller
            control={control}
            name="min_years"
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="引退生活の最小年数"
                type="min_years"
                error={'min_years' in errors}
                helperText={errors.min_years?.message}
                placeholder="例:30(半角数字)"
                inputMode='tel'
              />
            )}
         />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
            control={control}
            name="most_likely_years"
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="引退生活の最頻年数"
                type="most_likely_years"
                error={'most_likely_years' in errors}
                helperText={errors.most_likely_years?.message}
                placeholder="例:40(半角数字)"
                inputMode='tel'
              />
            )}
         />
      </Grid>
      <Grid item xs={12} sm={4}>   
        <Controller
            control={control}
            name="max_years"
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="引退生活の最大年数"
                type="max_years"
                error={'max_years' in errors}
                helperText={errors.max_years?.message}
                placeholder="例:50(半角数字)"
                inputMode='tel'
              />
            )}
         />
      </Grid>
    </Grid>     
        <Button
          color="secondary"
          variant="contained"
          size="large"
          onClick={handleSubmit(onSubmit)}
          disabled={progress}
        >
         {progress ? <span><span><PulseLoader color = '#6d84b4' size={8} />
         </span>  計算中</span>:'結果を表示'}
        </Button>

    <Grid container>
      <Grid item xs={12} sm={3}>  
        <ResultContext.Provider value = {result}>
          <ListDividers />        
        </ResultContext.Provider>
      </Grid>
      <Grid item  xs={11} sm={9}>
        <ChartContext.Provider value = {chartData}>
          <Graph />
        </ChartContext.Provider>
        <Grid item xs={1}/>
      </Grid>
    </Grid>
    
      </Stack>
    </Container>
  )
}

export default InputForm