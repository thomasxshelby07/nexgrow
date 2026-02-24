
import mongoose, { Schema } from "mongoose";

const NavbarSchema = new Schema({
    items: [{
        label: { type: String, required: true },
        path: { type: String, required: true },
        type: { type: String, enum: ["link", "button", "dropdown"], default: "link" },
        order: { type: Number, default: 0 },
        icon: String, // Optional icon name
        children: [{
            label: String,
            path: String,
            desc: String,
            icon: String
        }]
    }]
}, { timestamps: true });

const Navbar = mongoose.models.Navbar || mongoose.model("Navbar", NavbarSchema);

export default Navbar;
