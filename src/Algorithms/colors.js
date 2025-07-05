export const getColor = (color) => {
    switch (color) {
        case 'move':
            return 'rgb(220, 59, 241)';
        case 'compare':
            return 'rgb(220, 59, 241)';
        case 'wrong':
            return 'rgb(255, 0, 0)';
        case 'to_be_swap':
            return 'rgb(255, 0, 0)';
        case 'correct':
            return 'rgb(0, 200, 0)';
        case 'merged':
            return 'rgb(0, 200, 0)';
        case 'sorted':
            return '#6C7C59';
        default:
            return 'rgb(30, 192, 192)';
    }
};