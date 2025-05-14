 const formatPrice = (price: number) => {
    // Convert cents to dollars and format as USD
    const dollars = price / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(dollars);
  };

  export default formatPrice;