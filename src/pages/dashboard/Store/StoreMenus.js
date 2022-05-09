/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Card,
  Typography,
  TextField,
  Autocomplete,
  Button,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
// web.cjs is required for IE11 support
import { useSpring, animated } from 'react-spring';
import {
  fetchCategory,
  fetchDivision,
  fetchSubCategory,
  fetchProducts,
  getStorePages,
  createMenuItem,
  fetchMenu,
} from '../../../actions';

import UpdateStoreMenu from './UpdateStoreMenu';

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = styled((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />)(
  ({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
      '& .close': {
        opacity: 0.3,
      },
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 15,
      paddingLeft: 18,
      borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
  })
);

const StoreMenus = () => {
  const dispatch = useDispatch();

  // Fetch Products, Category, Subcategory, Division and Pages as this component loads for first time
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategory());
    dispatch(fetchSubCategory());
    dispatch(fetchDivision());
    dispatch(getStorePages());
    dispatch(fetchMenu());
  }, []);

  const [menuType, setMenuType] = useState();
  const [product, setProduct] = useState();
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [division, setDivision] = useState();
  const [page, setPage] = useState();
  const [itemName, setItemName] = useState();

  const [level] = useState("One");
  const [parent] = useState();

  const { products } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const { subCategories } = useSelector((state) => state.subCategory);
  const { divisions } = useSelector((state) => state.division);
  const { pages } = useSelector((state) => state.page);
  const { menus } = useSelector((state) => state.menu);

  const productOptions = products.map((el) => ({
    label: el.productName,
    value: el._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${el.images[0]}`,
  }));

  const categoryOptions = categories.map((el) => ({
    label: el.name,
    value: el._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${el.image}`,
  }));

  const subCategoryOptions = subCategories.map((el) => ({
    label: el.name,
    value: el._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${el.image}`,
  }));

  const divisionOptions = divisions.map((el) => ({
    label: el.name,
    value: el._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${el.image}`,
  }));

  const pageOptions = pages.map((el) => ({
    label: el.name,
    value: el._id,
  }));

  const onAdd = () => {
    dispatch(createMenuItem({ level, parent, menuType, itemName, product, category, subCategory, division, page }));
  };

 

  const tree = menus
    .filter((el) => el.level === 'One')
    .map((el, index1) => ({
      name: el.itemName,
      nodeId: index1 + 1,
      children: menus
        .filter((a) => a.level === 'Two')
        .map((b, index2) => ({
          name: b.itemName,
          nodeId: index1 + index2 + 2,
          children: menus
            .filter((c) => c.level === 'Three')
            .map((d, index3) => ({
              name: d.itemName,
              nodeId: index1 + index2 + index3 + 3,
            })),
        })),
    }));

  console.log(tree);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" className="pe-4 mb-4">
        <Typography>Store Menu</Typography>
      </Stack>
      <Box
        className="mb-3"
        sx={{
          display: 'grid',
          columnGap: 2,
          rowGap: 3,
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
        }}
      >
        <Card sx={{ p: 3 }}>
          <Typography sx={{ mb: 2 }} variant="subtitle2">
            Create Menu
          </Typography>
          {/* Radio => Level => One, Two or Three */}
          {/* Select Upper level it should fall into => if Level !== One  */}
          {/* Radio => Type => Product or Category or Sub category or Division or Pages */}
          {/* Autocomplete to select respective option available among chosen type */}
          {/* Name of Item */}
          {/* Button to create */}

         
          <TextField
          sx={{ mb: 3 }}
            name="itemName"
            label="Name"
            fullWidth
            value={itemName}
            onChange={(e) => {
              setItemName(e.target.value);
            }}
          />
          

          <Autocomplete
            
            value={menuType}
            onChange={(e, value) => {
              setMenuType(value);
            }}
            id=""
            fullWidth
            options={menuTypeOptions}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose Type"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: '', // disable autocomplete and autofill
                }}
              />
            )}
          />
          
          <Box sx={{ mt: 2 }}>
            {(() => {
              switch (menuType?.label) {
                case 'Product':
                  return (
                    <Autocomplete
                      sx={{ mb: 3 }}
                      value={product}
                      onChange={(e, value) => {
                        setProduct(value);
                      }}
                      id=""
                      fullWidth
                      options={productOptions}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                          <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
                          {option.label}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose a Product"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: '', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  );

                case 'Category':
                  return (
                    <Autocomplete
                      sx={{ mb: 3 }}
                      value={category}
                      onChange={(e, value) => {
                        setCategory(value);
                      }}
                      id=""
                      fullWidth
                      options={categoryOptions}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                          <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
                          {option.label}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose a Category"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: '', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  );

                case 'Sub Category':
                  return (
                    <Autocomplete
                      sx={{ mb: 3 }}
                      value={subCategory}
                      onChange={(e, value) => {
                        setSubCategory(value);
                      }}
                      id=""
                      fullWidth
                      options={subCategoryOptions}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                          <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
                          {option.label}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose a Sub Category"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: '', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  );

                case 'Division':
                  return (
                    <Autocomplete
                      sx={{ mb: 3 }}
                      value={division}
                      onChange={(e, value) => {
                        setDivision(value);
                      }}
                      id=""
                      fullWidth
                      options={divisionOptions}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                          <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
                          {option.label}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose a Division"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: '', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  );

                case 'Pages':
                  return (
                    <Autocomplete
                      sx={{ mb: 3 }}
                      value={page}
                      onChange={(e, value) => {
                        setPage(value);
                      }}
                      id=""
                      fullWidth
                      options={pageOptions}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose a Page"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: '', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  );

                default:
                  break;
              }
            })()}
          </Box>

          <Stack direction={'row'} sx={{ mt: 2 }} justifyContent="end" alignItems={'center'}>
            <Button
              onClick={() => {
                onAdd();
              }}
              variant="contained"
            >
              Add Menu
            </Button>
          </Stack>
        </Card>
        <Card sx={{ p: 3 }}>
          <Typography sx={{ mb: 2 }} variant="subtitle2">
            Menu Preview
          </Typography>
          <TreeView
            aria-label="customized"
            defaultExpanded={['1']}
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            defaultEndIcon={<CloseSquare />}
            sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
          >
            {tree.map((a) => (
              <StyledTreeItem key={a.nodeId} nodeId={a.nodeId} label={a.name}>
                {a.children.map((b) => (
                  <StyledTreeItem key={b.nodeId} nodeId={b.nodeId} label={b.name}>
                    {b.children.map((c) => (
                      <StyledTreeItem key={c.nodeId} nodeId={c.nodeId} label={c.name} />
                    ))}
                  </StyledTreeItem>
                ))}
              </StyledTreeItem>
            ))}
          </TreeView>
        </Card>

        {menus !== undefined && menus.length > 0 &&  <Card sx={{ p: 3 }}>
          <Typography sx={{ mb: 2 }} variant="subtitle2">
            Update menu
          </Typography>
          {menus.map((el) => (
            <UpdateStoreMenu key={el._id}  _id={el._id}
            levelA={el.level}
            parentA={el.parent}
            menuTypeA={el.menuType}
            itemNameA={el.itemName}
            productA={el.product}
            categoryA={el.category}
            subCategoryA={el.subCategory}
            divisionA={el.division}
            pageA={el.page} />
          ))}
        </Card> }
        
      </Box>
    </>
  );
};

export default StoreMenus;

const menuTypeOptions = [
  {
    label: 'Product',
  },
  {
    label: 'Category',
  },
  {
    label: 'Sub category',
  },
  {
    label: 'Division',
  },
  {
    label: 'Pages',
  },
];
