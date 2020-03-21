//Import react
import React from 'react';
import { forwardRef } from 'react';

//Import our json file bib.json to get all the data needed
import Bib from './data/Bib.json'

//Import material table library wich create nice table layout
import MaterialTable from 'material-table';

//Icons image to import in order to have nice icons to fill layout of our material table
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

//Get all the icons needed in our tab
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

function PostMaitre() {    
    const [state, setState] = React.useState({
      //Column name and id to match with our json
        columns: [
          { title: 'Name', field: 'name' },
          { title: 'City', field: 'city' },
          { title: 'Postal Code', field: 'postal_code' },
          { title: 'Type', field: 'type' },
          { title: 'Average Price (euro)', field: 'average_price' },
          { title: 'Phone Number', field: 'phone' },
          { title: 'Latitude', field: 'restau_lat' },
          { title: 'Longitude', field: 'restau_long' },
          { title: 'Distance to Esilv (Km)', field: 'distance' },
          { title: 'Website', field: 'website', render: row => (
              //eslint-disable-next-line
              <a href={row.website} target = "_blank">{row.website}</a>
          )},
        ],
        //Rows of our material table will be the bib.json that we retrieve further
        data: Bib,
      });
    
      return (
        //Create the material table object
        <MaterialTable
        //set the icons that we will use
          icons={tableIcons}
          //set the title
          title="BibGourmand x MaitreRestaurateur"
          //set the columns
          columns={state.columns}
          //set the data/row
          data={state.data}
          
          //add some option to have a better layout and clean one
          options={{       

            headerStyle: {
              backgroundColor: '#F8F7F7',
            },
            actionsCellStyle: {
                backgroundColor: '#F8F7F7',
            },            
          }}
          
          //add editable fuction to delete, add or modify the rows specified
          editable={{
            //add new row/data
            onRowAdd: newData =>
              //call the action on the clicked data
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  setState(prevState => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
            //update row/data
            onRowUpdate: (newData, oldData) =>
              //call this action on the clicked data
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    setState(prevState => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            //delete row/data
            onRowDelete: oldData =>
              //Call this action on the clicked data
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  setState(prevState => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
      );

}

export default PostMaitre; 
