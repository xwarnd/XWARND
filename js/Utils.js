function random_shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        // Swap elements
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

class Utils
{
    random_2(min, max)
    {
        let f = max - min;
        return min + (Math.random() * f);
    }

    dist(x1, y1, z1, x2, y2, z2)
    {
        return(Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), ) + Math.pow((z2 - z1), 2)));
    }

    secondsToHexForOrders(seconds)
    {
        // Base relationship: 30 seconds corresponds to hex 16
        let base_seconds = 30;
        let base_hex = 0x16;

        // Calculate hex value
        let hex_value = base_hex + (seconds - base_seconds) / 5;

        return hex_value;
    }
};