import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { fetcher } from "../utils";
import InfoContext from "../context/InfoContext";
import CartContext from "../context/CartContext";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "75vw",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function CheckoutModal({ open, handleClose, listOfProds }) {
  const [, dispatch] = useContext(CartContext);
  const [, setInfo] = useContext(InfoContext);
  const [cardNum, setCardNum] = useState("");
  const history = useHistory();
  const classes = useStyles();
  const style = {
    top: "50vh",
    left: "50vw",
    transform: `translate(-50%, -50%)`
  };
  const formatInput = e => {
    setCardNum(
      e.target.value.replace(/\d{4}(?!\s)/g, match => {
        // if it's the last 4-digit block then don't add a space after
        return e.target.value.length === 19 ? match : `${match} `;
      })
    );
  };
  const submitPurchase = async e => {
    e.preventDefault();
    try {
      await fetcher("/api/cart/checkout", {
        method: "POST",
        body: JSON.stringify(listOfProds),
        headers: {
          "Content-Type": "application/json"
        }
      });
      dispatch({ type: "clearCart" });
      setInfo({
        message: "Thanks for Purchasing From Mafroushati !",
        severity: "success",
        delay: 3000
      });
      history.replace("/");
    } catch (err) {
      setInfo({
        message: err.message,
        severity: "error"
      });
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <div className={classes.paper} style={style}>
        <form onSubmit={submitPurchase}>
          <Typography variant="h5" gutterBottom>
            Payment Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                name="cardName"
                required
                id="cardName"
                label="Name on card"
                fullWidth
                autoComplete="cc-name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="cardNumber"
                required
                inputProps={{
                  pattern: "(\\d{4}\\s){3}\\d{4}",
                  title: "Enter a valid credit card number",
                  minLength: "16",
                  maxLength: "19"
                }}
                id="cardNumber"
                label="Card number"
                fullWidth
                autoComplete="cc-number"
                value={cardNum}
                onInput={formatInput}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="expDate"
                required
                type="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
                id="expDate"
                label="Expiry date"
                fullWidth
                autoComplete="cc-exp"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="cvv"
                required
                id="cvv"
                inputProps={{
                  pattern: "[0-9]{3}",
                  title: "Enter a valid CVV",
                  maxLength: "3"
                }}
                label="CVV"
                helperText="Last three digits on signature strip"
                fullWidth
                autoComplete="cc-csc"
              />
            </Grid>
            <Grid item xs={12} align="right">
              <Button type="submit" variant="contained" color="primary">
                Submit Purchase
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Modal>
  );
}
