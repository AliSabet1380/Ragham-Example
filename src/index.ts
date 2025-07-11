// 3rd-party lib

// local modules
import app from "./app";

// constants
import { PORT } from "@constants";

// Application Entry
app.listen(PORT, () => {
  console.log(`Server Running On Port: ${PORT}`);
});
