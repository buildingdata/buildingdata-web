<p align="center">
 <img width="100px" src="logo.svg" align="center" alt="Logo" />
 <h2 align="center">LEB Platform</h2>
 <p align="center">China Building Energy Efficiency Design Fundamental Parameter Platform</p>
</p>
<p align="center">
  <a href="https://buildingdata.xauat.edu.cn/">
  	<img alt="buildingdata" src="https://img.shields.io/badge/LEB Platform-063c7c?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABQ0lEQVQ4jZ3UPU8UURjF8d8ubwmhopGAQKSDymhjQWm30hEbwkthgV9AQkUJFq5+AyVsIYXfwspADRWSYAMfgIIQH4qdjZv1zp1lT3Izd86c88/cZJ6pRYQ+9BY1HFcmI6JqvYl/WqnKV8Ga8b+agwCfRcRpAtbRaUQs9AvcyIB6tVkF/PYIWEeHKeCLiLgYANbR74JBRGxXhP9ExExEzEbEVUX2fR0rma/qEk/xCg3M4jyTbwzjOhNYwBpaxf0cFlE2DTf1DOxzUWx1ebuYLq4p1XLAA6wm/H18Len8zQFv8DrhL2u/+X3i2V0OCGMJ7x4j2j+LXmWPPIFfCf8E4xhKlXLALRwm/D08LyvlgJ9wi6Mev4GdQYCj+IgNnHX5X/CyrFPHkwz0A9axhO+ZXEdTw/ihfFrGMVns32mP3XwG+PMBYdAQPwkBdngAAAAASUVORK5CYII=&logoColor=white" />
  </a>
  <a href="https://github.com/buildingdata">
  	<img alt="Github" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
  </a>
	<a href="https://github.com/buildingdata/buildingdata-web/blob/master/LICENSE">
  	<img alt="License" src="https://img.shields.io/github/license/buildingdata/buildingdata-web.svg?style=for-the-badge" />
  </a>
    <a href="https://github.com/buildingdata/buildingdata-web/releases">
  	<img src="https://img.shields.io/github/v/release/buildingdata/buildingdata-web?label=version&style=for-the-badge" />
  </a>
</p>

### What is LEB Platform?

China Building Energy Efficiency Design Fundamental Parameter Platform (LEB Platform) provides indoor and outdoor parameter sets for building thermal engineering, HVAC design and building energy consumption simulation covering more than 1,019 cities and towns in China. It realises full coverage, dynamic updating and real-time sharing of the design calculation parameters in the current building thermal engineering, HVAC and building energy-saving design standards and design manuals. It provides a full range of energy-saving design data services for scientific research, education, engineering and technical personnel in the construction industry, and provides data support for the preparation of national and industrial standards in the field of building energy efficiency and the engineering and construction requirements of major national strategies such as building energy efficiency and emission reduction.

### Repository

The database files are located in the `/sql` directory, and the open source code for the site is in the `/web` directory, which has the following directory structure.

```
/sql
/web
├── /frontend        # front-end
├── /app_front       # mobile-app
└── /backend         # back-end
```

### Installation

#### 1.Clone

Clone this repository and sql import the data tables to mysql:

```bash
git clone https://github.com/buildingdata/buildingdata-web.git
```

#### 2.Download Dependencies

Navigate to the `/web/backend` project directory and run it:

```bash
mvn clean install
```

This will download all required dependencies and compile the project.

#### 3.Run Project

Run the application using the following command:

```bash
mvn spring-boot:run
```

This will start the embedded server (usually Tomcat).

#### 4.View

Once the server is up, open your browser and go to:

```bash
http://localhost:8080
```

### Open Data

This code repository is shared for [scientific data](https://www.nature.com/sdata/).

 <img width="150px" src="scidata.svg" align="right" alt="Logo" />

### License

The code is available under the [GPL-3.0 license](https://github.com/buildingdata/buildingdata-web/blob/master/LICENSE)
