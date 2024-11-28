import image from "./images/Animated Shape.svg";
import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaTrashAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { PatternFormat } from "react-number-format";

const Main = () => {
  const [countryCode, setCountryCode] = useState("998");
  const [phone, setPhone] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const [selectedCountry, setSelectedCountry] = useState("Uzbekistan"); 
  const [countryInput, setCountryInput] = useState(""); 
  const country = useRef();
  const password = useRef(null);
  const gender = useRef(null);
  const birthday = useRef(null);

  const [edit, setEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

 
 const handleCountrySelectChange = (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode); 
    setCountryInput(""); 
  };



    const handleCountryInputChange = (event) => {
    const inputValue = event.target.value;
    setCountryInput(inputValue); 
  };



  const handleCountryChange = (e) => {
    setCountryCode(e.target.value); 
  };


const handlePhoneChange = (values) => {
    setPhone(values.formattedValue);
  };



  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const genderValue = gender.current.value;

    if (genderValue !== "Erkak" && genderValue !== "Ayol") {
      alert("Sizning jinsingiz yoki Erkak yoki Ayol bo'lishi shart");
      return;
    }

    const parse_data = JSON.parse(localStorage.getItem("data")) || [];

    if (isEditing) {
      const updatedUser = {
        id: edit.id,
        fname,
        lname,
        username,
        phone,
        password: password.current.value,
        country: country.current.value,
        birthday: birthday.current.value,
        gender: genderValue,
      };
      setData((prev) =>
        prev.map((item) => (item.id === edit.id ? updatedUser : item))
      );
      setEdit(null);
      setIsEditing(false);
    } else {
      const usernameExists = parse_data.some(
        (item) => item.username === username
      );
      if (usernameExists) {
        alert("Username already exists");
        return;
      }

      const newUser = {
        id: uuidv4(),
        fname,
        lname,
        username,
        phone,
        password: password.current.value,
        country: country.current.value,
        birthday: birthday.current.value,
        gender: genderValue,
      };
      setData((prev) => [...prev, newUser]);
    }

    setUsername("");
    setFname("");
    setLname("");
    setPhone("");
    password.current.value = "";
    country.current.value = "";
    gender.current.value = "";
    birthday.current.value = "";
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (item) => {
    setUsername(item.username);
    setFname(item.fname);
    setLname(item.lname);
    setPhone(item.phone);
    password.current.value = item.password;
    country.current.value = item.country;
    gender.current.value = item.gender;
    birthday.current.value = item.birthday;
    setEdit(item);
    setIsEditing(true);
  };

  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b">
        <div className="flex gap-5 min-h-screen p-10 justify-center items-start">
          <form
            className="w-80 p-5 bg-white rounded-lg shadow-lg"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold mb-5 text-blue-800 text-center">
              {isEditing ? "Edit User" : "Create User"}
            </h2>
            <input
              required
              className="rounded-md outline-none w-full h-10 px-3 mb-3 border focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              type="text"
              placeholder="First name"
            />
            <input
              required
              className="rounded-md outline-none w-full h-10 px-3 mb-3 border focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              type="text"
              placeholder="Last name"
            />
            <input
              required
              className="rounded-md outline-none w-full h-10 px-3 mb-3 border focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
            />
          

<div className="flex">
  <div className="relative inline-flex items-center px-3 py-2 border border-gray-600 bg-gray-800 rounded-l-md w-40">
    <select
      className="appearance-none bg-transparent focus:outline-none text-sm text-gray-300 w-full"
      name="country-code"
      id="country-code"
      value={countryCode}
      onChange={handleCountryChange} // Handle country code change
    >
      <option value="998" data-countrycode="UZ">🇺🇿 +998</option>
      <option value="44" data-countrycode="GB">🇬🇧 +44</option>
      <option value="1" data-countrycode="CA">🇨🇦 +1</option>
      <option value="61" data-countrycode="AU">🇦🇺 +61</option>
      <option value="91" data-countrycode="IN">🇮🇳 +91</option>
      <option value="49" data-countrycode="DE">🇩🇪 +49</option>
      <option value="33" data-countrycode="FR">🇫🇷 +33</option>
      <option value="81" data-countrycode="JP">🇯🇵 +81</option>
      <option value="55" data-countrycode="BR">🇧🇷 +55</option>
      <option value="27" data-countrycode="ZA">🇿🇦 +27</option>
      <option value="86" data-countrycode="CN">🇨🇳 +86</option>
      <option value="52" data-countrycode="MX">🇲🇽 +52</option>
      <option value="39" data-countrycode="IT">🇮🇹 +39</option>
      <option value="34" data-countrycode="ES">🇪🇸 +34</option>
      <option value="82" data-countrycode="KR">🇰🇷 +82</option>
      <option value="7" data-countrycode="RU">🇷🇺 +7</option>
      <option value="54" data-countrycode="AR">🇦🇷 +54</option>
      <option value="966" data-countrycode="SA">🇸🇦 +966</option>
      <option value="234" data-countrycode="NG">🇳🇬 +234</option>
      <option value="46" data-countrycode="SE">🇸🇪 +46</option>
      <option value="1" data-countrycode="US">🇺🇸 +1</option>
    </select>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      className="w-4 h-4 ml-2 text-gray-400 absolute right-2 pointer-events-none"
    >
      <path
        d="M19 9l-7 7-7-7"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      ></path>
    </svg>
  </div>
  <PatternFormat
    format={`+${countryCode} ## ### ## ##`} 
    mask="_"
    required
    value={phone}
    onValueChange={handlePhoneChange}
    placeholder="Phone number"
    className="w-full px-3 py-2 border border-gray-600 bg-white text-gray-800 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  />
</div>




            <div className="relative mb-3 mt-3">
              <input
                minLength={6}
                required
                className="rounded-md outline-none w-full h-10 px-3 border focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                ref={password}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <div
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>




    <div className="max-w-xs w-64">
    <div className="flex w-64">
    <div className="relative inline-flex items-center px-3 py-2 border border-gray-600 bg-gray-800 rounded w-64 mb-3">
        <select
          className=" appearance-none bg-transparent focus:outline-none text-sm text-gray-300 w-full"
          name="country-code"
          id="country-code"
          value={selectedCountry} 
          onChange={handleCountrySelectChange}
        >
          <option value="Uzbekistan" data-countrycode="Uzbekistan">🇺🇿 Uzbekistan</option>
          <option value="United Kingdom" data-countrycode="United Kingdom">🇬🇧 United Kingdom</option>
          <option value="Canada" data-countrycode="Canada">🇨🇦 Canada</option>
          <option value="Australia" data-countrycode="Australia">🇦🇺 Australia</option>
          <option value="India" data-countrycode="India">🇮🇳 India</option>
          <option value="Germany" data-countrycode="Germany">🇩🇪 Germany</option>
          <option value="France" data-countrycode="France">🇫🇷 France</option>
          <option value="Japan" data-countrycode="Japan">🇯🇵 Japan</option>
          <option value="Brazil" data-countrycode="Brazil">🇧🇷 Brazil</option>
          <option value="South Africa" data-countrycode="South Africa">🇿🇦 South Africa</option>
          <option value="China" data-countrycode="China">🇨🇳 China</option>
          <option value="Mexico" data-countrycode="Mexico">🇲🇽 Mexico</option>
          <option value="Italy" data-countrycode="Italy">🇮🇹 Italy</option>
          <option value="Spain" data-countrycode="Spain">🇪🇸 Spain</option>
          <option value="South Korea" data-countrycode="South Korea">🇰🇷 South Korea</option>
          <option value="Russia" data-countrycode="Russia">🇷🇺 Russia</option>
          <option value="Argentina" data-countrycode="Argentina">🇦🇷 Argentina</option>
          <option value="Saudi Arabia" data-countrycode="Saudi Arabia">🇸🇦 Saudi Arabia</option>
          <option value="Nigeria" data-countrycode="Nigeria">🇳🇬 Nigeria</option>
          <option value="Sweden" data-countrycode="Sweden">🇸🇪 Sweden</option>
          <option value="United States" data-countrycode="United States">🇺🇸 United States</option>
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          className="w-4 h-4 ml-2 text-gray-400 absolute right-2 pointer-events-none"
        >
          <path
            d="M19 9l-7 7-7-7"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
      </div>
    </div>
  </div>





            <input
              required
              ref={gender}
              type="text"
              placeholder="Erkak"
              className="rounded-md outline-none w-full h-10 px-3 mb-3 border focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <input
              required
              ref={birthday}
              type="date"
              placeholder="Birth date"
              className="rounded-md outline-none w-full h-10 px-3 mb-3 border focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <button className="w-full rounded-md h-10 bg-blue-500 text-white font-bold hover:bg-blue-600 transition">
              {isEditing ? "Save" : "Create"}
            </button>
          </form>

          <div className="flex-1 flex flex-wrap gap-6 items-start py-5 content-start">
            {data?.map((item) => (
              <div
                key={item.id}
                className="w-72 p-5 bg-white rounded-lg shadow-lg flex flex-col gap-3 items-center"
              >
                <div className="w-20 h-20 bg-slate-300 rounded-full mx-auto"></div>
                <h3 className="font-bold text-xl text-gray-700">
                  {item.fname}
                </h3>
                <h3 className="font-bold text-xl text-gray-600">
                  {item.lname}
                </h3>
                <h3 className="font-bold text-xl text-blue-700">
                  {item.username}
                </h3>
                <h4 className="font-medium text-gray-500">{item.phone}</h4>
                <h4 className="font-medium text-gray-500">{item.password}</h4>
                <h4 className="font-medium text-gray-500">{item.country}</h4>
                <h4 className="font-medium text-gray-500">{item.gender}</h4>
                <h4 className="font-medium text-gray-500">{item.birthday}</h4>
                <div className="flex gap-3 justify-center mt-3">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    <FaTrashAlt />
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 hover:text-blue-600 transition"
                  >
                    <FiEdit3 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main
