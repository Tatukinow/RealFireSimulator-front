import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


function Introduct() {
  return (
  <Grid container>
    <Grid item sm={2}/>
    <Grid item lg={8} sm={8}>
      <Card sx={{ minWidth: 275,
                  bgcolor: "#4267b2"
                }}>
        <CardContent>
          <Typography variant="h1" sx={{ fontSize: 24 }} color="#d8dfea" gutterBottom>
            FIREという言葉にご興味がありますか？
            <div>Pythonで成功率を予測してみましょう</div>
          </Typography>
          <Typography variant="body1" component="div" gutterBottom 
                      sx={{ fontSize: 16 }} color="#d8dfea">
              近年「FIRE」(経済的自立と早期リタイア)という言葉が話題になっています。
              働いて投資元本を貯蓄し、資産運用による利益で生活費をまかなうことで、早期リタイアと悠々自適な生活を実現するという考え方です。
              <div>一般的には、年間生活費のおよそ25倍の初期資金があればFIREを実現できると言われています。</div>
              <div>しかし、それは本当に確かでしょうか？</div>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item sm={2}/>
    <Grid item sm={2}/>
    <Grid item lg={8} sm={8}>
      <Card sx={{ minWidth: 275,
                  bgcolor: "#afbdd4"
                }}>
        <CardContent>
          <Typography variant="h1" sx={{ fontSize: 24 }} color="#29487d" gutterBottom>
            リスクを予測し、備える
          </Typography>
          <Typography variant="body1" component="div" gutterBottom 
                      sx={{ fontSize: 16 }} color="#29487d">
              株式市場は不確実なものであり、バブルもあれば大恐慌もあります。
              <div>また「引退生活の終わり」と遠まわしに呼べる日が、いつになるかという不確実性もあります。</div>
              <div>これらの不確実性を考慮し、資金が尽きる確率や最終的に残る資金をシミュレートして予測してみましょう。</div>
              <div>投資対象や初期資金、年間生活費、予想される引退生活の年数を入力することで、過去53年分の市場データと引退生活年数の三角分布をもとに、モンテカルロシミュレーションによる5万回の試行で結果を統計的に予測します。
              </div>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
  )
}

export default Introduct