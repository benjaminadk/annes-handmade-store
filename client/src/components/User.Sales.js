import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import ProductIcon from '@material-ui/icons/ShoppingCart'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { formatDate } from '../utils/formatDate'
import _ from 'lodash'

const styles = theme => ({
  root: {
    marginTop: '3vh',
    marginBottom: '3vh',
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    marginBottom: '1vh'
  },
  sales: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  tableContainer: {
    width: '50vw',
    display: 'flex',
    justifyContent: 'flex-end'
  }
})

class UserSales extends Component {
  render() {
    const { classes, sales } = this.props
    const columns = [
      {
        Header: () => <Typography variant="body2">Order Date</Typography>,
        accessor: 'createdOn',
        width: 100,
        Cell: props => (
          <Typography variant="body2">{formatDate(props.value)}</Typography>
        )
      },
      {
        Header: () => <Typography variant="body2">Shipped</Typography>,
        accessor: 'shipped',
        width: 75,
        Cell: props => (
          <Typography variant="body2">{props.value ? 'Yes' : 'No'}</Typography>
        )
      },
      {
        Header: () => <Typography variant="body2">Pieces</Typography>,
        accessor: 'quantity',
        width: 75,
        Cell: props => (
          <Typography variant="body2">
            {_.reduce(
              props.value,
              function(sum, n) {
                return sum + n
              },
              0
            )}
          </Typography>
        )
      },
      {
        Header: () => <Typography variant="body2">Products</Typography>,
        expander: true,
        width: 75,
        Expander: ({ isExpanded, ...rest }) => (
          <div>{isExpanded ? <CloseIcon /> : <ProductIcon />}</div>
        ),
        style: {
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center'
        }
      },
      {
        Header: () => <Typography variant="body2">Total</Typography>,
        accessor: 'total',
        width: 150,
        Cell: props => (
          <Typography variant="body2">{`$ ${props.value}`}</Typography>
        )
      }
    ]
    const columns2 = [
      {
        Header: () => <Typography variant="body2">Count</Typography>,
        accessor: 'quantity',
        Cell: props => <Typography variant="body2">{props.value}</Typography>
      },
      {
        Header: () => <Typography variant="body2">Type</Typography>,
        accessor: 'variant',
        Cell: props => (
          <Typography variant="body2">
            {props.value === 1
              ? 'Necklace'
              : props.value === 2
                ? 'Bracelet'
                : props.value === 3
                  ? 'Earings'
                  : 'Unknown'}
          </Typography>
        )
      },
      {
        Header: () => <Typography variant="body2">Name</Typography>,
        accessor: 'title',
        Cell: props => <Typography variant="body2">{props.value}</Typography>
      },
      {
        Header: () => <Typography variant="body2">Price</Typography>,
        accessor: 'price',
        Cell: props => (
          <Typography variant="body2">{`$ ${props.value}`}</Typography>
        )
      }
    ]
    return (
      <div className={classes.root}>
        <div className={classes.sales}>
          <Typography variant="display1" className={classes.title}>
            Sales
          </Typography>
          <Typography variant="body2" align="justify">
            The Sales Table represents your entire purchase history as a logged
            in user at Anne's Handmade. Use this for record keeping as well as
            to track if your order has shipped. Click the Shopping Cart Icon to
            view the details of each purchase. This table will only appear on
            larger screen devices.
          </Typography>
        </div>
        <div className={classes.tableContainer}>
          <ReactTable
            data={sales}
            columns={columns}
            defaultSorted={[{ id: 'createdOn', desc: true }]}
            defaultPageSize={
              sales.length === 0 ? 0 : sales.length < 20 ? sales.length : 20
            }
            SubComponent={row => {
              const data = row.original.products.map((p, i) =>
                Object.assign({}, p, { quantity: row.original.quantity[i] })
              )
              return (
                <div>
                  <ReactTable
                    data={data}
                    columns={columns2}
                    showPagination={false}
                    defaultPageSize={row.original.products.length}
                  />
                </div>
              )
            }}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(UserSales)
