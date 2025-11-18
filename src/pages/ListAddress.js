import { Button, Table } from "antd";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { useEffect, useState } from "react";

function ListAddress() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
  const SHEET_ID = process.env.REACT_APP_SHEET_ID;
  const CLIENT_EMAIL = process.env.REACT_APP_CLIENT_EMAIL;
  const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, '\n');

  useEffect(() => {
    LoadValue();
  }, [])

  const LoadValue = async() => {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsById[1044737235];
    const rows = await sheet.getRows();
    setData(rows);
    setLoading(false);
  }

  const columns = [
    {
      title: 'Wallet',
      dataIndex: 'wallet',
      key: 'wallet',
      render: text => <a href={'https://bscscan.com/address/' + text} target='_blank'>{text}</a>,
    }
  ]
  
  return (
    <div className='intro'>
      <div className='intro__container'>
        <Table columns={columns} dataSource={data} rowKey="wallet" loading={loading} />
      </div>
    </div>
  )
}

export default ListAddress
