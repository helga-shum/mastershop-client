import React, { useState, useEffect } from "react";
import styles from "./createCardPanel.module.css";
import { nanoid } from "nanoid";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { createCard } from "../../../store/cards";



const CreateCardPanel = () => {
  const dispatch = useDispatch();
  
//default values ​​for product slide
  const clearSlide={
    value:'',
    list:[]
  }
  const clearMeasures={
      name:'',
      type:'',
  }
//default values ​​for the product map
  const clearData = {
    title: "",
    brand:"",
    category: 0,
    fabric:"",
    sizes:[],
    price: "",
    procent:0,
    description: "",
    measures: [],
    imageUrl: [],
  };
  const [data, setData] = useState(clearData);
  const [slides, setSlides] = useState(clearSlide);
  const [measure, setMeasure] = useState(clearMeasures);
  const [errors, setErrors] = useState({});
  // State with list of all checked item
 
  const checkList = ["34", "36", "38", "40","42","44","46"];
   // Add/Remove checked item from list
   const handleCheck = (event) => {
  
    var updatedList = [...data.sizes];
    if (event.target.checked) {
      updatedList = [...data.sizes, event.target.value];
    } else {
      updatedList.splice(data.sizes.indexOf(event.target.value), 1);
    }
    setData((prevState) => ({
      ...prevState,
      sizes:updatedList,
    }));
  
  };




//changes in the field of the product card
  const handleChange = (target) => {
console.log(data)
    const { name, value, type } = target;
    console.log(name, value, type)
    setData((prevState) => ({
      ...prevState,
      [name]: type === "number" ? Number(value) : value,
    }));
  };
  const handleChangeCategory = (target) => {
    console.log(data)
        const { name, value, type } = target;
        console.log(name, value, type)
        setData((prevState) => ({
          ...prevState,
          category:Number(value)
        }));
      };

//change product slide
  const onChangeValue = (target) => {
    console.log(slides)
    setSlides((prevState) => ({
      ...prevState,       
      value: target.value
  
    }));
    
  };

  const onChangeMeasureValue = (target) => {

    const { name, value } = target;
    console.log(measure)
    setMeasure((prevState) => ({
      ...prevState,       
      [name]: value
  
    }));
   
    
  };



  const validatorConfig = {
    title: {
      isRequired: {
        message: "Required",
      },
    },

    category: {
      isRequired: {
        message: "Required",
      },
    },
    brand: {
      isRequired: {
        message: "Required",
      },
    },
    fabric: {
      isRequired: {
        message: "Required",
      },
    },
    size: {
      isRequired: {
        message: "Required",
      },
    },
    price: {
      isRequired: {
        message: "Required",
      },
    },
    description: {
      isRequired: {
        message: "Required",
      },
    },

   
  };
  const validatorSlide = {
    value: {
      isRequired: {
        message: "Required",
      },
    },
   
  };
  const validatorMeasure = {
    name: {
      isRequired: {
        message: "Required",
      },
    },
    type: {
      isRequired: {
        message: "Required",
      },
    },
   
  };

  useEffect(() => {
    validate();
  }, [data]);
//slide validation
const validateSlide =()=>{
  const errors = validator(slides, validatorSlide);
    setErrors(errors);
    return Object.keys(errors).length === 0;
}
//measure validation
  const validateMeasure =()=>{
    const errors = validator(measure, validatorMeasure);
      setErrors(errors);
      return Object.keys(errors).length === 0;
  }
//validation of the product card
  const validate = () => {
    
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;


  const clearForm = () => {
    setData(clearData);
  };
  const clearFormSlide = () => {
    setSlides(clearSlide);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
      dispatch(createCard(data));
      
      clearForm();
      clearFormSlide();
    } catch (error) {
      setErrors(error);
    }

  };
  const onAddItem = () => {
    const isValid = validateSlide();
    if (!isValid) return;
    try {
    setSlides(state => {
      const list = state.list.concat(state.value);
      setData((prevState) => ({
        ...prevState,       
        imageUrl: list 
  
      }));
      return {
        list,
        value: '',
      };
    });
  } catch (error) {
    setErrors(error);
  }
  };
  const onAddMeasure = () => {
    const isValid = validateMeasure();
    if (!isValid) return;
    try {

    setMeasure(state => {
      setData((prevState) => ({
        ...prevState,       
        measures: [...prevState.measures, state]
  
      }));
      return {
        name:'',
        type: '',
      };
    });
  } catch (error) {
    setErrors(error);
  }
  };

  const getInputClasses = (error) => {
    return `${error ? styles.invalid : styles.valid}`;
  };


  return (
    <>
      <section>
        <div className={styles.panel}>
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            disabled={!isValid}
          >
            <img
              src="/icons/actionIcons/add.svg"
              alt="add"
              className={`${!isValid && styles.disabled}`}
            />
          </button>
          <div className={styles.theadBlock}>
            <div>
              <form onSubmit={handleSubmit} className={styles.thead}>
              <div className={styles.blocks}>
              <div className={styles.block}>

                <div className={styles.inline}>
                <div className={styles.title}>
              <h4>Title</h4>
              </div>
                  <input
                    type="text"
                    name="title"
                    value={data.title}
                    placeholder="Dress..."
                    error={errors.title}
                    onChange={(e) => handleChange(e.target)}
                    className={getInputClasses(errors.title)}
                  />
                  {errors.title && (
                    <div className={styles.errorMessage}>{errors.title}</div>
                  )}
                </div>
                </div>
                <div className={`${styles.block} ${styles.checkbox}`}>
                
                <div className={styles.inline}>
                <div className={styles.title}>
              <h4>Brand</h4>
              </div>
                  <select
                    value={data.brand}
                    name="brand"
                    onChange={(e) => handleChange(e.target)}
                    error={errors.brand}
                    className={getInputClasses(errors.brand)}
                  >
                    <option value="GUESS">GUESS</option>
                    <option value="HUGO">HUGO</option>
                    <option value="TOMMY HILFIGER">TOMMY HILFIGER</option>
                    <option value="DKNY">DKNY</option>
                    <option value="ADIDAS">ADIDAS</option>
                    <option value="CALVIN KLEIN">CALVIN KLEIN</option>
                    <option value="LEVI'S">LEVI'S</option>
                    <option value="ONLY">ONLY</option>
                    <option value="REEBOK">REEBOK</option>
                    <option value="MORGAN">MORGAN</option>
                    <option value="PUMA">PUMA</option>
                    <option value="PINKO">PINKO</option>
                    <option value="COLUMBIA">COLUMBIA</option>
                  </select>
                  {errors.brand && (
                    <div className={styles.errorMessage}>{errors.brand}</div>
                  )}
                </div>

                <div className={styles.inline}>
                <div className={styles.title}>
              <h4>Category</h4>
              </div>
                  <select
                  type="number"
                    value={data.category}
                    name="category"
                    onChange={(e) => handleChangeCategory(e.target)}
                    error={errors.category}
                    className={getInputClasses(errors.category)}
                  >
                    <option value="1">Skirts</option>
                    <option value="2">Dresses</option>
                    <option value="3">Trousers</option>
                    <option value="4">T-Shirts</option>
                    <option value="5">Jeans</option>
                    <option value="6">Tops</option>
                    <option value="7">Sweaters</option>
                    <option value="8">Shirts</option>
                    <option value="9">Costumes</option>
                  </select>
                  {errors.category && (
                    <div className={styles.errorMessage}>{errors.category}</div>
                  )}
                </div>

                <div className={styles.inline}>
                <div className={styles.title}>
              <h4>Fabric</h4>
              </div>
                  <select
                    value={data.fabric}
                    name="fabric"
                    onChange={(e) => handleChange(e.target)}
                    error={errors.fabric}
                    className={getInputClasses(errors.fabric)}
                  >
                    <option value="Linen">Linen</option>
                    <option value="Polyester">Polyester</option>
                    <option value="Crepe">Crepe</option>
                    <option value="Denim">Denim</option>
                    <option value="Cotton">Cotton</option>
                  </select>
                  {errors.fabric && (
                    <div className={styles.errorMessage}>{errors.fabric}</div>
                  )}
                </div>
                </div>
                <div className={styles.block}>

                <div className={styles.inline}>
                <div className={styles.title}>
              <h4>Size</h4>
              </div>
              <div className={styles.sizes}>
                  {checkList.map((item, index) => (
                    <div key={index} className={styles.wrapper}>
                    <label className={styles.cbWrapper}>
                      <input value={item} type="checkbox" className={styles.cbInput} onChange={handleCheck}/>
                      <span className={styles.cbTitle}>
                        <span className={styles.cbIcon}>
                        </span>
                        <span className={styles.cbLabel}>{item}</span>
                      </span>
                    </label>
                  </div>
                  ))}
                
                  {errors.sizes && (
                    <div className={styles.errorMessage}>{errors.sizes}</div>
                  )}
                  </div>
                </div>
                </div>
                <div className={styles.block}>

                <div className={styles.inline}>
                <div className={styles.title}>
              <h4>Price</h4>
              </div>
                  <input
                    type="number"
                    value={data.price}
                    name="price"
                    placeholder="1200"
                    min="0"
                    onChange={(e) => handleChange(e.target)}
                    error={errors.price}
                    className={getInputClasses(errors.price)}
                  />
                  {errors.price && (
                    <div className={styles.errorMessage}>{errors.price}</div>
                  )}
                </div>

                <div className={styles.inline}>
                <div className={styles.title}>
              <h4>Procent</h4>
              </div>
                  <input
                    type="number"
                    value={data.procent}
                    name="procent"
                    placeholder="0"
                    min="0"
                    max="100"
                    onChange={(e) => handleChange(e.target)}
                    error={errors.procent}
                    className={getInputClasses(errors.procent)}
                  />
                  {errors.procent && (
                    <div className={styles.errorMessage}>{errors.procent}</div>
                  )}
                </div>
                </div>
                <div className={styles.block}>

                <div className={styles.inline}>
                <div className={styles.title}>
              <h4>Description</h4>
              </div>
                  <input
                    type="text"
                    value={data.description}
                    name="description"
                    placeholder="Product..."
                    onChange={(e) => handleChange(e.target)}
                    error={errors.description}
                    className={getInputClasses(errors.description)}
                  />
                  {errors.description && (
                    <div className={styles.errorMessage}>
                      {errors.description}
                    </div>
                  )}
                </div>
                </div>
                <div className={styles.block}>

                <div className={styles.inline}>
                <div className={styles.title}>
              <h4>Measures</h4>
              </div>
                  <input
                    type="text"
                    value={measure.name}
                    name="name"
                    placeholder="Colour..."
                    onChange={(e) => onChangeMeasureValue(e.target)}
                    error={errors.image}
                    className={`${styles.cardSlides} ${getInputClasses(
                      errors.image
                    )}`}
                  />
                  {errors.image && (
                    <div className={styles.errorMessage}>{errors.image}</div>
                  )}
                  
                </div>
                <div className={styles.inline}>
                  <input
                    type="text"
                    value={measure.type}
                    name="type"
                    placeholder="Blue..."
                    onChange={(e) => onChangeMeasureValue(e.target)}
                    error={errors.image}
                    className={`${styles.cardSlides} ${getInputClasses(
                      errors.image
                    )}`}
                  />
                  {errors.image && (
                    <div className={styles.errorMessage}>{errors.image}</div>
                  )}
                  
                </div>

                <button type="button" className={styles.button} onClick={onAddMeasure}>
                  add measure
                </button>
                </div>
                <div className={styles.block}>

                <div className={styles.inline}>
                <div className={styles.title}>
              <h4>Image</h4>
              </div>
                  <input
                    type="text"
                    value={slides.value}
                    name="image"
                    placeholder="Slide1.jpg"
                    onChange={(e) => onChangeValue(e.target)}
                    error={errors.image}
                    className={`${styles.cardSlides} ${getInputClasses(
                      errors.image
                    )}`}
                  />
                  {errors.image && (
                    <div className={styles.errorMessage}>{errors.image}</div>
                  )}
                  
                </div>
                <button type="button" className={styles.button} onClick={onAddItem}>
                  add slide
                </button>
                </div>
                </div>
              </form>
              <div>
                <h4>Slides</h4>
                
                <ul className={styles.list}>
                {slides.list.length ==0 ? <li>Empty</li> : slides.list.map((element)=><li>{element}<button className={styles.close}>❌</button></li>)}
                </ul>
              </div>
              <div>
                <h4>Measures</h4>
                <ul className={styles.list}>
                {data.measures.length ==0 ? <li>Empty</li> : data.measures.map((element)=><li>{element.name}-{element.type}<button className={styles.close}>❌</button></li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

CreateCardPanel.propTypes = {
  createCard: PropTypes.func,
};
export default CreateCardPanel;
