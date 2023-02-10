import app from "./index";
const port = process.env.PORT || 4030;

app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`)
});