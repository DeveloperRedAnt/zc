

{
  "id": "v_38421312134",
  "thumbnail": "http://zycas-rac.local:8080/storage/products/product-343-variant-384.jpg",
  
  "minimum_stock": 10,
  "sku_code": "ZYCAS-0nsBD",
  "barcode": "aR1NVCAyPp4j",
  "is_active": true,
  "is_wholesale": true,
  "variant_units": [
    {
      "id": "vu_2131231213132",
      "unit_name": "Eceran",
      "conversion_value": "1",
      "price": "10.000"
    },
    {
      "id": "vu_2131231213132",
      "unit_name": "Kodi",
      "conversion_value": "20",
      "price": "190.000"
    }
  ],
  "attributes": [ // atributes varian
    {
      "attribute_id": 1,  // id attibute dari dropdown attribute
      "value": "Biru" // value | option varian 
    },
    {
      "attribute_id": 2,  // id attibute dari dropdown attribute
      "value": "Small" // value | option varian 
    }
  ]
},


{
  "id": "a7db94e5bd",
  "name": "M - l",
  "barcode": "3444",
  "sku": "45555",
  "minStock": 30,
  "thumbnail": "blob:http://localhost:3000/da44fc19-a072-4b90-bbbd-205350bfc17f",
  "prices": [
      {
          "id": "30075740d5",
          "namePcs": "Single",
          "quantity": 1,
          "price": 10000
      }
  ],
  "typeprice": "Multi Kemasan"
}


{
  "id": "v_38421312134" -> data.,
  "thumbnail": "http://zycas-rac.local:8080/storage/products/product-343-variant-384.jpg", -> data.thumbnail
  
  "minimum_stock": 10, -> data.minStock
  "sku_code": "ZYCAS-0nsBD", -> data.sku
  "barcode": "aR1NVCAyPp4j", -> data.barcode
  "is_active": true,  -> data.is_active
  "is_wholesale": true, -> dataParent.isWholesale
  "variant_units": [ // ini dari prices
    {
      "id": "vu_2131231213132",
      "unit_name": "Eceran",
      "conversion_value": "1",
      "price": "10.000"
    },
    {
      "id": "vu_2131231213132",
      "unit_name": "Kodi",
      "conversion_value": "20",
      "price": "190.000"
    }
  ],

  "attributes": [ // atributes varian
    {
      "attribute_id": 1,  // id attibute dari dropdown attribute
      "value": "Biru" // value | option varian 
    },
    {
      "attribute_id": 2,  // id attibute dari dropdown attribute
      "value": "Small" // value | option varian 
    }
  ]
},



{
    "thumbnailFile": {},
    "thumbnailUrl": null,
    "productName": "arabica",
    "isActiveProduct": true,
    "isFavorite": false,
    "selectedTags": [
        {
            "label": "diskon",
            "value": 2
        },
        {
            "label": "diskon 1",
            "value": 51
        },
        {
            "label": "diskon 2",
            "value": 52
        }
    ],
    "content": "250",
    "package": "Botol",
    "unit_id": 1,
    "barcode": "345654345654",
    "sku": "56545654",
    "is_track_stock": true,
    "minimum_stock": 30,
    "is_enable_expired_reminder": false,
    "expired_reminder_in_days": 5,
    "expired_reminder_in_date": null,
    "default_prices": [
        {
            "id": 1754566738391,
            "itemName": "Single",
            "quantity": 1,
            "price": 30000
        }
    ],
    "composite": {
        "production_per_batch": 0,
        "components": []
    },
    "variants": [
        {
            "id": "d2d3ac44a1",
            "name": "Merah - L",
            "barcode": "3404312312300",
            "sku": "435345234234",
            "minStock": 10,
            "thumbnail": "blob:http://localhost:3000/af2d9d67-9bd8-454a-841c-cb8afc272448",
            "prices": [
                {
                    "id": "3c459cc53d",
                    "namePcs": "Singkle",
                    "quantity": 1,
                    "price": 10000
                }
            ],
            "typeprice": "Multi Kemasan",
            "options": [
                {
                    "id": "10f073240a",
                    "type": "Warna",
                    "name": "Merah",
                    "selected_id": "1204"
                },
                {
                    "id": "263d46c545",
                    "type": "Warna",
                    "name": "L",
                    "selected_id": "1205"
                }
            ],
            "isActive": false
        },
        {
            "id": "636e612a4b",
            "name": "Merah - M",
            "barcode": "67688899090",
            "sku": "768687687",
            "minStock": 900,
            "thumbnail": "blob:http://localhost:3000/a4e27b02-9f56-48c5-9f13-611005ed1399",
            "prices": [
                {
                    "id": "f8223b59aa",
                    "namePcs": "double",
                    "quantity": 1,
                    "price": 90000
                }
            ],
            "typeprice": "Multi Kemasan",
            "options": [
                {
                    "id": "10f073240a",
                    "type": "Warna",
                    "name": "Merah",
                    "selected_id": "1204"
                },
                {
                    "id": "1120af3dc8",
                    "type": "Warna",
                    "name": "M",
                    "selected_id": "1205"
                }
            ],
            "isActive": true
        }
    ]
}

{
  "id": "p_132122132",
  "name": "arabica",
  "type": "variant",
   "package": "Botol",
  "thumbnail": "http://zycas-rac.local:8080/storage/products/product-343-variant-384.jpg",
  "is_active": true,
  "is_favorite": false,
  "is_non_tax": true,
  "content": "100% Katun, Nyaman dipakai harian.",
  "unit_id": 21,
  "current_stock": "16 Plastik Wrap",
  "tag_ids": [ // tag ids
    184,
    185,
    186
  ],
  "is_stock_tracking": true,
  "is_enable_expired_reminder": true,
  "expired_reminder_in_days": 10,
  "expired_reminder_in_date": "2025-10-22",
  "variants": [
    {
      "id": "v_38421312134",
      "thumbnail": "http://zycas-rac.local:8080/storage/products/product-343-variant-384.jpg",
      
      "minimum_stock": 10,
      "sku_code": "ZYCAS-0nsBD",
      "barcode": "aR1NVCAyPp4j",
      "is_active": true,
      "is_wholesale": true,
      "variant_units": [
        {
          "id": "vu_2131231213132",
          "unit_name": "Eceran",
          "conversion_value": "1",
          "price": "10.000"
        },
        {
          "id": "vu_2131231213132",
          "unit_name": "Kodi",
          "conversion_value": "20",
          "price": "190.000"
        }
      ],
      "attributes": [ // atributes varian
        {
          "attribute_id": 1,  // id attibute dari dropdown attribute
          "value": "Biru" // value | option varian 
        },
        {
          "attribute_id": 2,  // id attibute dari dropdown attribute
          "value": "Small" // value | option varian 
        }
      ]
    },
    {
      "id": "v_3453453",
      "thumbnail": "http://zycas-rac.local:8080/storage/products/product-343-variant-2131.jpg",
      "minimum_stock": 10,
      "sku_code": "ZYCAS-786675",
      "barcode": "jgajds8",
      "is_active": true,
      "is_wholesale": true,
      "variant_units": [
        {
          "id": "vu_A2131231223",
          "unit_name": "Eceran",
          "conversion_value": "1",
          "price": "10.000"
        },
        {
          "id": "vu_B2131231213132",
          "unit_name": "Kodi",
          "conversion_value": "20",
          "price": "190.000"
        }
      ],
      "attributes": [ // atributes varian
        {
          "attribute_id": 1, // id attibute dari dropdown attribute
          "value": "Biru" // value | option varian 
        },
        {
          "attribute_id": 2,
          "value": "Medium"
        }
      ]
    }
  ],
 "composites": null // di single dan vairant ini optional, ga dikirim juga ga papa
}


        {
            "id": "d2d3ac44a1",
            "name": "Merah - L",
            "barcode": "3404312312300",
            "sku_code": "435345234234",
            "minimum_stock": 10,
            "thumbnail": "blob:http://localhost:3000/af2d9d67-9bd8-454a-841c-cb8afc272448",
            "prices": [
                {
                    "id": "3c459cc53d",
                    "namePcs": "Singkle",
                    "quantity": 1,
                    "price": 10000
                }
            ],
            "typeprice": "Multi Kemasan",
            "options": [
                {
                    "id": "10f073240a",
                    "type": "Warna",
                    "name": "Merah",
                    "selected_id": "1204"
                },
                {
                    "id": "263d46c545",
                    "type": "Warna",
                    "name": "L",
                    "selected_id": "1205"
                }
            ],
            "isActive": false
        },


    {
      "id": "d2d3ac44a1",
      "name": "Merah - L",
      "barcode": "3404312312300",
      "sku_code": "435345234234",
      "minimum_stock": 10,
      "is_wholesale": true,
      "variant_units": [
         {
                    "id": "vu_3c459cc53d",
                    "unit_name": "Singkle",
                    "conversion_value": "1",
                    "price": "10.000"
        }
      ],
      "attributes": [
        {
          "attribute_id": 1204, 
          "value": "Merah" 
        },
        {
          "attribute_id": 1205,
          "value": "L"
        }
      ]
    }