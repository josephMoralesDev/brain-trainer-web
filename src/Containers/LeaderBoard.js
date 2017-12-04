import React, {Component} from 'react';
import { connect } from 'react-redux';
import {red500} from 'material-ui/styles/colors';
import { setDialog } from '../Actions';
import {db} from '../App.js';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
    }
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillMount() {
    db
    .collection("high_scores")
    .orderBy("score", "desc")
    .onSnapshot(snapshot => {
      const values = [];
      snapshot.forEach(doc => {
        values.push(doc.data())
      })
      this.setState({scores: values})
    });
  }
  handleClose() {
    this.props.closeDialog();
  }

  render() {
    const listItems = this.state.scores.map((user, i) =>
      <TableRow
        style={{borderBottomColor: red500, borderTopColor: red500}}
        key={i}
      >
         {console.log(user)}
        <TableRowColumn style={{color: red500}}>{user.name.split(" ")[0]}</TableRowColumn>
        <TableRowColumn style={{color: red500}}>{user.score}</TableRowColumn>
      </TableRow>
    );

    return (
      <Dialog
          title="LEADER BOARD"
          modal={false}
          open={this.props.dialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          contentStyle={{padding: '0px !important', borderBottomColor: red500, borderTopColor: red500}}
          bodyStyle={{padding: '0px !important', borderBottomColor: red500, borderTopColor: red500}}
          titleStyle={{fontWeight: 'bold', fontSize: '1.5rem', color: red500}}
        >
          <Table
            style={{borderBottomColor: red500, borderTopColor: red500}}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              style={{borderBottomColor: red500, borderTopColor: red500}}
            >
              <TableRow
                style={{borderBottomColor: red500, borderTopColor: red500}}
              >
                <TableHeaderColumn style={{color: red500}}>Name</TableHeaderColumn>
                <TableHeaderColumn style={{color: red500}}>Score</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {this.state.scores ? listItems : (
                <TableRow
                  style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}
                  key={'loading'}
                >
                  <CircularProgress color={red500} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    dialog: state.app.dialog,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: () => {
      dispatch(setDialog())
    },
  }
}

const ConnectedPlayerScore = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaderBoard)

export default ConnectedPlayerScore;
