export const generateRandomColor = () => {
    const colors = [
      '#FF5733', '#33FF57', '#5733FF', '#FF5733', '#33FF57',
      '#5733FF', '#FF5733', '#33FF57', '#5733FF', '#FF5733',
      '#33FF57', '#5733FF', '#FF5733', '#33FF57', '#5733FF',
      '#FF5733', '#33FF57', '#5733FF', '#FF5733', '#33FF57',
      '#5733FF', '#FF5733', '#33FF57', '#5733FF', '#FF5733',
      '#33FF57', '#5733FF'
    ];
  
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };