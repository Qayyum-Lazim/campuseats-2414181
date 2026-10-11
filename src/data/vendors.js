const vendors = [
 {
 id: 'my-restaurant',
 name: 'Al-Khairat Restaurant',
 location: 'Mahallah ..., Block ...',
 openHours: '7:00 am - 10:00 pm',
 isOpen: true,
 menu: [
 { id: '01', name: 'Bubur', description: 'Delicious rice porridge', price: 6, category: 'Rice',
available: true },
 { id: '02', name: 'Roti Canai', description: 'flaky and delicious', price: 1, category:
'Starters', available: true },
 { id: '03', name: 'Air Bandung', description: 'Rose syrup with milk', price: 2.5, category:
'Drinks', available: false },
 ],
 },
 {
 id: 'kafe-aminah',
 name: 'Kafe Mahallah Aminah',
 location: 'Mahallah Aminah, Ground Floor',
 openHours: '8:00 am - 9:00 pm',
 isOpen: true,
 menu: [
 { id: 'ami-1', name: 'Nasi Ayam Penyet', description: 'Smashed fried chicken with sambal and rice', price: 9, category: 'Rice', available: true }, { id: 'ami-2', name: 'Air Bandung', description: 'Rose syrup with milk', price:3, category: 'Drinks', available: true },
 ],
 },
]
export default vendors