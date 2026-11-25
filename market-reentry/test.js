const assert=require('node:assert/strict'),E=require('./engine');
const bars=E.demo(),start='2020-01-01',end='2024-12-31';
for(const frame of ['daily','weekly']){
 const a=E.run(bars,start,end,{frame}),b=E.run(bars.filter(x=>x.date<=end),start,end,{frame});
 for(const name of Object.keys(a.result)){
  assert.deepEqual(a.result[name].curve,b.result[name].curve,'No future data dependence: '+frame+' '+name);
  assert.deepEqual(a.result[name].trades,b.result[name].trades);
  for(const trade of a.result[name].trades) if(trade.signalDate!=='—') assert(trade.signalDate<trade.date,'Fill follows signal');
 }
 assert(a.result['Re-entry'].trades.length>0);
}
const flat=[{date:'2020-01-01',open:100,high:100,low:100,close:100,volume:1},{date:'2020-01-02',open:100,high:100,low:100,close:100,volume:1}];
const hold=E.run(flat,'2020-01-01','2020-01-02',{cost:10,cash:0}).result['Buy & hold'];
assert(Math.abs(hold.end-100000/1.001)<1e-6);
assert.equal(hold.trades.length,1);
assert.throws(()=>E.parseCSV('Date,Open,High,Low,Close,Volume\n2020-01-01,10,11,9,,100',false));
assert.equal(E.parseCSV('Date,Open,High,Low,Close,Volume,Adj Close\n2020-01-01,10,11,9,10,100,5\n2020-01-02,10,11,9,10,200,5',true)[0].close,5);
console.log('PASS: daily and weekly no-future-execution check, next-session fills, costs, CSV validation/adjustment.');
