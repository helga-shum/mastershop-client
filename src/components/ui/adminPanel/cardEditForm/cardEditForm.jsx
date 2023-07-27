import React, { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../forms/textField";
import Button from "../../button";
import SelectField from "../../forms/selectField";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { loadCardsList, updateCard } from "../../../store/cards";
import { nanoid } from "nanoid";

const CardEditForm = ({ cardId, onClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCardsList());
  }, []);
  const { entities: cards } = useSelector((state) => state.cards);
  //default values ​​for the product card
  const clearData = {
    title: "",
    brand: "",
    category: 0,
    fabric: "",
    sizes: [],
    price: "",
    procent: 0,
    description: "",
    measures: [],
    imageUrl: [],
  };
  //default values ​​for product slides
  const clearSlide = {
    value: "",
    list: [],
  };
  const clearMeasures = {
    name: "",
    type: "",
  };

  const [data, setData] = useState(() => {
    const card = cards.find((card) => card._id === cardId);
    return card ? card : clearData;
  });

  const [slides, setSlides] = useState(() => {
    const card = cards.find((card) => card._id === cardId);
    return card ? { value: "", list: card.imageUrl } : clearSlide;
  });
  const [measures, setMeasures] = useState(clearMeasures);
  console.log(data.sizes);
  // State with list of all checked item
  const checkList = ["34", "36", "38", "40", "42", "44", "46"];

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
      sizes: updatedList,
    }));
  };

  console.log(data);
  console.log(measures);
  console.log(slides);
  const [errors, setErrors] = useState({});
  //change product map fields
  const handleChange = (target) => {
    const { name, value, type } = target;

    setData((prevState) => ({
      ...prevState,
      [name]: type === "number" ? Number(value) : value,
    }));
  };
  //adding product map changes
  const onUpdateItem = (target) => {
    const { name, value } = target;
    setSlides((slides) => {
      const list = slides.list.map((item, j) => {
        if (j === Number(name)) {
          return value;
        } else {
          return item;
        }
      });
      setData((prevState) => ({
        ...prevState,
        imageUrl: list,
      }));
      return {
        list,
      };
    });
  };
  //change slide values
  const onChangeValue = (target) => {
    setSlides((prevState) => ({
      ...prevState,
      value: target.value,
    }));
  };
  //add slide
  const onAddItem = () => {
    setSlides((state) => {
      const list = state.list.concat(state.value);
      setData((prevState) => ({
        ...prevState,
        imageUrl: list,
      }));
      return {
        list,
        value: "",
      };
    });
  };
  //remove the slide
  const onRemoveItem = (i) => {
    setSlides((state) => {
      const list = state.list.filter((item, j) => i !== j);
      setData((prevState) => ({
        ...prevState,
        imageUrl: list,
      }));
      return {
        list,
        value: "",
      };
    });
  };
  const onUpdateMeasureName = (target) => {
    const { name, value } = target;
    console.log(data);
    const list = data.measures.map((item, j) => {
      if (j === Number(name)) {
        return { ...item, name: value };
      } else {
        return item;
      }
    });
    setData((prevState) => ({
      ...prevState,
      measures: list,
    }));
  };
  const onUpdateMeasureType = (target) => {
    console.log(data);
    const { name, value } = target;

    const list = data.measures.map((item, j) => {
      if (j === Number(name)) {
        return { ...item, type: value };
      } else {
        return item;
      }
    });
    setData((prevState) => ({
      ...prevState,
      measures: list,
    }));
  };
  //change slide values
  const onChangeMeasureValue = (target) => {
    const { name, value } = target;
    console.log(measures);
    setMeasures((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //add slide
  const onAddMeasure = () => {
    //const isValid = validateSlide();
    //if (!isValid) return;
    try {
      setMeasures((state) => {
        setData((prevState) => ({
          ...prevState,
          measures: [...prevState.measures, state],
        }));
        return {
          name: "",
          type: "",
        };
      });
    } catch (error) {
      setErrors(error);
    }
  };
  //remove the slide
  const onRemoveMeasure = (i) => {
    const list = data.measures.filter((item, j) => i !== j);
    setData((prevState) => ({
      ...prevState,
      measures: list,
    }));

    console.log(measures);
    console.log(data);
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
    price: {
      isRequired: {
        message: "Required",
      },
    },
    image: {
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

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  //add all changes
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
      dispatch(updateCard(cardId, data));
      onClose();
    } catch (error) {
      setErrors(error);
    }
  };

  const categoriesList = [
    { label: "Skirts", value: 1 },
    { label: "Dresses", value: 2 },
    { label: "Trousers", value: 3 },
    { label: "T-Shirts", value: 4 },
    { label: "Jeans", value: 5 },
    { label: "Tops", value: 6 },
    { label: "Sweaters", value: 7 },
    { label: "Shirts", value: 8 },
    { label: "Costumes", value: 9 },
  ];

  const brandsList = [
    { label: "GUESS", value: "GUESS" },
    { label: "HUGO", value: "HUGO" },
    { label: "TOMMY HILFIGER", value: "TOMMY HILFIGER" },
    { label: "DKNY", value: "DKNY" },
    { label: "CALVIN KLEIN", value: "CALVIN KLEIN" },
    { label: "ONLY", value: "ONLY" },
    { label: "REEBOK", value: "REEBOK" },
    { label: "MORGAN", value: "MORGAN" },
    { label: "PUMA", value: "PUMA" },
    { label: "PINKO", value: "PINKO" },
    { label: "COLUMBIA", value: "COLUMBIA" },
  ];

  const fabricsList = [
    { label: "Polyester", value: "Polyester" },
    { label: "Crepe", value: "Crepe" },
    { label: "Cotton", value: "Cotton" },
  ];

  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={data.title}
            placeholder="Mistel..."
            onChange={handleChange}
            error={errors.title}
            autoComplete="current-title"
            autoFocus
          />
          <SelectField
            label="Select brand"
            options={brandsList}
            name="brand"
            onChange={handleChange}
            value={data.brand}
            error={errors.brand}
          />
          <SelectField
            label="Select category"
            options={categoriesList}
            name="category"
            onChange={handleChange}
            value={data.category}
            error={errors.category}
          />
          <SelectField
            label="Select fabric"
            options={fabricsList}
            name="fabric"
            onChange={handleChange}
            value={data.fabric}
            error={errors.fabric}
          />
          <div>
            {checkList.map((item, index) => (
              <div key={index}>
                <input
                  value={item}
                  checked={data.sizes.includes(item)}
                  type="checkbox"
                  onChange={handleCheck}
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <TextField
            type="number"
            label="Price"
            name="price"
            value={data.price}
            placeholder="1200"
            min="0"
            onChange={handleChange}
            error={errors.price}
            autoComplete="current-price"
          />
          <TextField
            type="number"
            label="Procent"
            name="procent"
            value={data.procent}
            placeholder="1200"
            min="0"
            onChange={handleChange}
            error={errors.procent}
            autoComplete="current-procent"
          />
          <TextField
            label="Description"
            name="description"
            value={data.description}
            placeholder="Dress..."
            onChange={handleChange}
            error={errors.description}
            autoComplete="current-description"
          />
          {data.measures.map((_, index) => (
            <>
              <TextField
                key={nanoid()}
                label="Name"
                name={index}
                value={data.measures[index].name}
                error={errors.measures}
                placeholder="Measure name"
                onChange={onUpdateMeasureName}
                autoComplete={`current-image-${index}`}
              />
              <TextField
                key={nanoid()}
                label="Type"
                name={index}
                value={data.measures[index].type}
                error={errors.measures}
                placeholder="Measure type"
                onChange={onUpdateMeasureType}
                autoComplete={`current-image-${index}`}
              />
              <button onClick={() => onRemoveMeasure(index)}>
                <img
                  src="/icons/actionIcons/delete.svg"
                  alt="delete"
                  className="margin-left: 15px"
                />
              </button>
            </>
          ))}
          <TextField
            label="New masure name"
            name="name"
            value={measures.name}
            error={errors.measures}
            placeholder="New measure"
            onChange={onChangeMeasureValue}
            autoComplete="current-image-new"
          />
          <TextField
            label="New masure type"
            name="type"
            value={measures.type}
            error={errors.measures}
            placeholder="New measure"
            onChange={onChangeMeasureValue}
            autoComplete="current-image-new"
          />
          <Button
            type="button"
            appearance="ctvBlueSubmit"
            onClick={onAddMeasure}
            disabled={true}
          >
            Add measure
          </Button>
          {slides.list.map((_, index) => (
            <>
              <TextField
                key={nanoid()}
                label={`Slide ${index + 1}`}
                name={index}
                value={slides.list[index]}
                error={errors.slides}
                placeholder={`Slide ${index + 1}`}
                onChange={onUpdateItem}
                autoComplete={`current-image-${index}`}
              />
              <button onClick={() => onRemoveItem(index)}>
                <img
                  src="/icons/actionIcons/delete.svg"
                  alt="delete"
                  className="margin-left: 15px"
                />
              </button>
            </>
          ))}
          <TextField
            label="New slide"
            name="newSlide"
            value={slides.value}
            error={errors.slides}
            placeholder="New slide"
            onChange={onChangeValue}
            autoComplete="current-image-new"
          />
          <Button
            type="button"
            appearance="ctvBlueSubmit"
            onClick={onAddItem}
            disabled={true}
          >
            Add slide
          </Button>
          <div>
            <Button appearance="ctvBlueSubmit" type="submit" disabled={isValid}>
              Confirm
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

CardEditForm.propTypes = {
  cardId: PropTypes.string,
  updateCard: PropTypes.func,
  onClose: PropTypes.func,
};
export default CardEditForm;
