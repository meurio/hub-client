DonationWidget
==============

Propriedades:
    
    ```
    DonationWidget.propTypes = {
      editable: PropTypes.bool.isRequired,
      mobilization: PropTypes.shape({
        id: PropTypes.number,
        header_font: PropTypes.string
      }).isRequired,
      widget: PropTypes.shape({
        id: PropTypes.number,
        settings: PropTypes.shape({
          default_donation_value: PropTypes.number,
          payment_type: PropTypes.oneOf(['users_choice']),
          payment_methods: PropTypes.oneOf(['true', 'false']),
          recurring_period: PropTypes.number,
          main_color: PropTypes.string,
          donation_value_1: PropTypes.number,
          donation_value_2: PropTypes.number,
          donation_value_3: PropTypes.number,
          donation_value_4: PropTypes.number,
          donation_value_5: PropTypes.number,
          button_text: PropTypes.string,
          title_text: PropTypes.string,
          finish_message_type: PropTypes.oneOf([''])
        })
      }),
      handleDonationTransactionCreate: PropTypes.func.isRequired,
      checkout: PropTypes.shape({
        open: PropTypes.func    
      })
    }
    ```
