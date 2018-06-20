import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    marginTop: '10vh',
    marginBottom: '10vh',
    paddingLeft: '5vw',
    paddingRight: '5vw',
    minHeight: '60vh'
  },
  title: {
    marginBottom: '5vh'
  },
  subTitle: {
    marginTop: '3vh',
    marginBottom: '1vh'
  },
  content: {
    width: '80%'
  }
})

const Privacy = ({ classes }) => (
  <div className={classes.root}>
    <Typography variant="display2" className={classes.title}>
      Privacy Policy
    </Typography>
    <div className={classes.content}>
      <Typography variant="body2" align="justify">
        This privacy policy has been compiled to better serve those who are
        concerned with how their 'Personally Identifiable Information' (PII) is
        being used online. PII, as described in US privacy law and information
        security, is information that can be used on its own or with other
        information to identify, contact, or locate a single person, or to
        identify an individual in context. Please read our privacy policy
        carefully to get a clear understanding of how we collect, use, protect
        or otherwise handle your Personally Identifiable Information in
        accordance with our website.
      </Typography>
      <Typography variant="title" className={classes.subTitle}>
        What personal information do we collect from the people that visit our
        blog, website or app?
      </Typography>
      <Typography variant="body2" align="justify">
        When ordering or registering on our site, as appropriate, you may be
        asked to enter your name, email address, mailing address, credit card
        information or other details to help you with your experience.
      </Typography>
      <Typography variant="title" className={classes.subTitle}>
        When do we collect information?
      </Typography>
      <Typography variant="body2" align="justify">
        We collect information from you when you place an order or enter
        information on our site.
      </Typography>
      <Typography variant="title" className={classes.subTitle}>
        How do we use your information?
      </Typography>
      <Typography variant="body2" align="justify">
        To allow us to better service you in responding to your customer service
        requests. To quickly process your transactions.
      </Typography>
      <Typography variant="title" className={classes.subTitle}>
        How do we protect your information?
      </Typography>
      <Typography variant="body2" align="justify">
        Our website is scanned on a regular basis for security holes and known
        vulnerabilities in order to make your visit to our site as safe as
        possible. Your personal information is contained behind secured networks
        and is only accessible by a limited number of persons who have special
        access rights to such systems, and are required to keep the information
        confidential. In addition, all sensitive/credit information you supply
        is encrypted via Secure Socket Layer (SSL) technology. We do NOT save
        credit card data on any of our servers. All credit card information goes
        directly to Stripe, a well known payment processing company. All
        transactions are processed through a gateway provider and are not stored
        or processed on our servers.
      </Typography>
      <Typography variant="title" className={classes.subTitle}>
        Third-party disclosure
      </Typography>
      <Typography variant="body2" align="justify">
        We do not sell, trade, or otherwise transfer to outside parties your
        Personally Identifiable Information.
      </Typography>
    </div>
  </div>
)

export default withStyles(styles)(Privacy)
