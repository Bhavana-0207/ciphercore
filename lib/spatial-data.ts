export type VerificationStatus = 'PENDING VERIFICATION' | 'VERIFIED' | 'REVIEW REQUIRED'
export interface PropertyUnit { id:string; ulpin:string; verticalTag:string; volumetricHash:string; floor:number; unitNumber:string; area:number; elevation:number; confidence:number; verificationStatus:VerificationStatus }
export interface Floor { number:number; elevation:number; units:PropertyUnit[] }
export interface Building { id:string; name:string; floors:Floor[]; basements:number; footprint:number; builtUpArea:number }
export interface Parcel { id:string; ulpin:string; area:number; building:Building }
export interface Conflict { id:string; title:string; detail:string; depth:string; clearance:string }
export const units = Array.from({length:5},(_, floor)=>({number:floor+1,elevation:(floor+1)*3.2,units:Array.from({length:4},(_,i)=>({id:`A${floor+1}0${i+1}`,ulpin:'TN09-10821',verticalTag:`A${floor+1}0${i+1}`,volumetricHash:['8F32B1','C12A84','D44E91','A98C20'][i],floor:floor+1,unitNumber:`A${floor+1}0${i+1}`,area:820+i*46,elevation:(floor+1)*3.2,confidence:91.4+i,verificationStatus:'PENDING VERIFICATION' as VerificationStatus}))}))
export const demoParcel: Parcel = {id:'parcel-01',ulpin:'TN09-10821',area:2480,building:{id:'building-01',name:'Survey Block A',floors:units,basements:2,footprint:1120,builtUpArea:5600}}
export const conflicts: Conflict[]=[{id:'c-01',title:'Utility corridor intersects basement volume',detail:'Proposed underground utility corridor',depth:'-3.8 m',clearance:'1.42 m'}]
export const validationRows=[['TN09-10821','Sector 14, Chennai','Boundary mismatch','97.2%','PENDING'],['TN09-10834','Sector 14, Chennai','Missing floor plan','88.6%','REVIEW'],['TN09-10852','Ward 09, Chennai','Low LiDAR density','76.1%','REVIEW'],['TN09-10876','Civic Layout','Unit overlap','91.4%','PENDING'],['TN09-10903','Market Road','Basement detected','94.8%','REVIEW']]
export const identity=(unit:PropertyUnit)=>`TN09-10821-${unit.verticalTag}-${unit.volumetricHash}`
export const propertyService={async getProperty(){await new Promise(r=>setTimeout(r,180));return demoParcel},async generate3DIdentity(unit:PropertyUnit){await new Promise(r=>setTimeout(r,500));return identity(unit)}}
export const validationService={async getQueue(){return validationRows}}
export const infrastructureService={async getConflicts(){return conflicts}}
export const ulpinService={async validate(){return {status:'PASS',confidence:94.8}}}
export const allUnits=units.flatMap(f=>f.units)
export const selectedUnit=allUnits[2]
export const stats=[['PARCELS MAPPED','1,284','+8.4%'],['BUILDINGS RECONSTRUCTED','436','+12.1%'],['PROPERTY UNITS','2,908','+18.6%'],['FLOORS DETECTED','6,742','+9.7%'],['UNDERGROUND STRUCTURES','84','+4.2%'],['PENDING VALIDATIONS','27','-6.8%']]
export type ViewMode='overview'|'explorer'|'generate'|'validation'|'conflicts'|'property'
export const navItems=[['overview','Overview'],['explorer','3D Explorer'],['generate','Generate 3D ULPIN'],['validation','Validation'],['conflicts','Infrastructure'],['property','Property Records']]
export function flattenFloorUnits(){return allUnits}
export function findUnit(tag:string){return allUnits.find(u=>u.verticalTag===tag)||selectedUnit} 
export function getElevationLabel(n:number){return n>0?`+${n.toFixed(1)} m`:`${n.toFixed(1)} m`}
export function stageLabel(stage:number){return ['DATA','RECONSTRUCT','SEGMENT','VALIDATE','IDENTIFY'][stage]}
export function nowTime(){return '08:42:16 IST'}
export function createSearchResult(query:string){return query.toUpperCase().includes('TN09')?demoParcel:null}
export function getPropertySummary(){return {plotArea:'2,480 m²',footprint:'1,120 m²',builtUp:'5,600 m²',floors:'05',basements:'02',units:'20'}}
export function checks(){return ['Parcel boundary consistency','Building footprint alignment','Floor height consistency','Unit overlap','Coordinate reference','Existing ULPIN match']}
export function lineage(){return ['GIS','DRONE','LiDAR','FLOOR PLAN','RECONSTRUCTION','VERTICAL SEGMENTATION','VALIDATION','OFFICER APPROVAL']}
export function sourceList(){return ['GIS Parcel','Drone Imagery','LiDAR Point Cloud','Floor Plan','GNSS/CORS']}
export function processList(){return ['Parcel boundary detected','Building footprint extracted','Point cloud cleaned','Roof geometry reconstructed','Floor levels estimated','Vertical units segmented','Boundary consistency checked']}
export function floorStats(floor:number){const f=units[floor-1];return {floor:`Floor ${floor}`,elevation:`+${f.elevation.toFixed(1)} m`,units:f.units.length,area:`${f.units.reduce((a,u)=>a+u.area,0).toLocaleString()} m²`,confidence:'93.8%'}}
export function utilitySegments(){return [0,1,2,3]}
export function surveyPoints(){return Array.from({length:9},(_,i)=>({x:(i%3)*4-4,z:Math.floor(i/3)*3-3}))}
export function adjacentParcels(){return Array.from({length:7},(_,i)=>({x:(i%4)*8-16,z:Math.floor(i/4)*10-12}))}
export const colors={navy:'#142536',blue:'#2d7298',cyan:'#68d3df',ink:'#142536',paper:'#f4f6f8',muted:'#6c7a86',line:'#d7e0e6',amber:'#c58a32',red:'#b5524e',green:'#3f876d'}
export function formatConfidence(n:number){return `${n.toFixed(1)}%`}
export function proposedId(unit:PropertyUnit){return identity(unit)}
export function demoDescription(){return 'Demonstration property loaded · synthetic survey data'}
export function spatialHash(unit:PropertyUnit){return unit.volumetricHash}
export function floorLabel(n:number){return n===0?'GROUND':`FLOOR ${String(n).padStart(2,'0')}`}
export function basementLabel(n:number){return `BASEMENT -${n}`}
export function selectedPropertyLabel(){return 'SELECTED PROPERTY'}
export function routeFor(view:ViewMode){return view==='overview'?'/':`/${view}`}
export function isKnownRoute(value:string){return navItems.some(([id])=>id===value)}
export function getUnitById(id:string){return allUnits.find(u=>u.id===id)||selectedUnit}
export function confidenceTone(n:number){return n>94?'high':n>88?'medium':'low'}
export function serviceStatus(){return {gis:'ONLINE',postgis:'READY',processing:'MOCK SERVICE'}}
export function currentDate(){return '31 AUG 2026'}
export function appTitle(){return '3D PROPERTY INTELLIGENCE'}
export function appSubtitle(){return 'Spatial identity, vertical mapping and validation'}
export function officerNotice(){return 'AI-generated property geometry remains UNVERIFIED until authorized officer approval.'}
export function identityParts(unit:PropertyUnit){return {existing:'TN09-10821',vertical:unit.verticalTag,hash:unit.volumetricHash,proposed:identity(unit)}}
export function nextStage(n:number){return Math.min(4,n+1)}
export function isComplete(n:number){return n>=4}
export function routeTitle(view:ViewMode){return navItems.find(([id])=>id===view)?.[1]||'Overview'}
export function metricValue(label:string){return stats.find(s=>s[0]===label)?.[1]||'—'}
export function mockDelay(ms:number){return new Promise(resolve=>setTimeout(resolve,ms))}
export function getParcelBounds(){return {width:24,depth:22}}
export function getBuildingDimensions(){return {width:12,depth:10,height:16}}
export function undergroundDepth(){return 7}
export function layerNames(){return ['Property Parcels','Buildings','Property Units','Floors','Underground','Roads','Utilities','Survey Points','Drone Coverage','LiDAR Density','Validation Status']}
export function statusLabel(s:string){return s==='PASS'?'PASS':s}
export function getDemoPropertyId(){return 'TN09-10821'}
export function getPropertyPath(){return '/property/TN09-10821'}
export function getExplorerPath(){return '/explorer'}
export function isPrototypeId(){return true}
export function getSystemNote(){return 'Prototype environment · mock services enabled'}
export function getCoordinate(){return '13.0827° N, 80.2707° E'}
export function getSurvey(){return 'GNSS-CRS-01482'}
export function getLastUpdated(){return 'Updated 2 min ago'}
export function getOfficer(){return 'Awaiting authorized officer'}
export function getArea(){return 'Ward 09 · Chennai Urban'}
export function getLayerCount(){return 11}
export function getStageCount(){return 5}
export function getFloorCount(){return 5}
export function getUnitCount(){return 20}
export function getBasementCount(){return 2}
export function getConfidence(){return 94.8}
export function getHash(){return '8F32B1'}
export function getTag(){return 'A03'}
export function getCoordinates(){return '13.0827, 80.2707'}
export function getReviewStatus(){return 'PENDING VERIFICATION'}
export function getDemoIdentity(){return 'TN09-10821-A03-8F32B1'}
export function getEmptyState(){return 'Select a parcel, building, floor or unit to inspect its spatial identity.'}
export function getNotFound(){return 'No matching property found in demonstration dataset.'}
export function getLoading(){return 'Loading spatial dataset'}
export function getProcessing(){return 'Processing survey geometry'}
export function getCompleted(){return 'Processing complete'}
export function getConflictStatus(){return 'REVIEW REQUIRED'}
export function getDataSourceStatus(){return '5 / 5 SOURCES AVAILABLE'}
export function getAppVersion(){return 'ULPIN / DEMO 0.6'}
export function getFooter(){return 'SMART AUTOMATION · SIH26011'}
export function getSelectedFloor(){return 3}
export function getSelectedUnit(){return selectedUnit}
export function getSelectedIdentity(){return identity(selectedUnit)}
export function getCurrentTime(){return nowTime()}
export function getStatusTone(){return 'amber'}
export function getSceneMode(){return 'CITY / PARCEL / BUILDING / FLOOR / UNIT'}
export function getPropertyType(){return 'RESIDENTIAL · MULTI-UNIT'}
export function getSpatialRef(){return 'EPSG:4326 / LOCAL DEMO'}
export function getGenerationState(){return 'READY FOR DEMONSTRATION'}
export function getValidationSummary(){return '6 / 6 automated checks passed'}
export function getInfrastructureSummary(){return '1 conflict detected'}
export function getQueueSummary(){return '27 records pending officer action'}
export function getMapNote(){return 'Local demonstration map · no external credentials required'}
export function getUnitArea(unit:PropertyUnit){return `${unit.area.toLocaleString()} m²`}
export function getUnitElevation(unit:PropertyUnit){return getElevationLabel(unit.elevation)}
export function getUnitStatus(unit:PropertyUnit){return unit.verificationStatus}
export function getUnitSource(){return 'GIS · DRONE · LiDAR · FLOOR PLAN'}
export function getPropertyCoordinates(){return '12°58\'17.8"N 77°35\'40.6"E'}
export function getBuildingHeight(){return '+16.0 m'}
export function getBasementHeight(){return '-6.4 m'}
export function getParcelStatus(){return 'MAPPED · READY FOR REVIEW'}
export function getSceneTitle(){return 'URBAN DIGITAL TWIN'}
export function getSceneSubtitle(){return 'Synthetic survey dataset / Chennai Urban'}
export function getPanelTitle(){return 'PROPERTY IDENTITY'}
export function getLayersTitle(){return 'MAP LAYERS'}
export function getToolsTitle(){return 'TOOLS'}
export function getStageProgress(){return '01 / 05'}
export function getDemoButton(){return 'LOAD DEMO PROPERTY'}
export function getApprovalLabel(){return 'OFFICER VERIFICATION REQUIRED'}
export function getPrototypeLabel(){return 'PROTOTYPE ID'}
export function getMockLabel(){return 'MOCK SERVICE'}
export function getSystemHealth(){return 'SYSTEM NOMINAL'}
export function getLocale(){return 'EN / IN'}
export function getOperator(){return 'OPERATOR 04'}
export function getRegion(){return 'BENGALURU URBAN'}
export function getModeLabel(){return 'COMMAND CENTRE'}
export function getEmptySearch(){return 'Search ULPIN / Property / Coordinates'}
export function getConflictLabel(){return 'CONFLICT DETECTED'}
export function getReviewLabel(){return 'REVIEW REQUIRED'}
export function getPassLabel(){return 'PASS'}
export function getPendingLabel(){return 'PENDING'}
export function getVerifiedLabel(){return 'VERIFIED'}
export function getDataLineage(){return lineage()}
export function getSourceList(){return sourceList()}
export function getProcessList(){return processList()}
export function getChecks(){return checks()}
export function getValidationRows(){return validationRows}
export function getStats(){return stats}
export function getNavItems(){return navItems}
export function getUnitList(){return allUnits}
export function getFloors(){return units}
export function getConflictList(){return conflicts}
export function getParcel(){return demoParcel}
export function getIdentity(unit=selectedUnit){return identityParts(unit)}
export function getFloorStats(n=3){return floorStats(n)}
export function getServices(){return serviceStatus()}
export function getVersion(){return getAppVersion()}
export function getCurrentRoute(){return '/'}
export function getCurrentView(){return 'overview'}
export function getCardRadius(){return '4px'}
export function getAccent(){return colors.cyan}
export function getShell(){return colors.navy}
export function getSurface(){return colors.paper}
export function getLine(){return colors.line}
export function getText(){return colors.ink}
export function getMuted(){return colors.muted}
export function getAmber(){return colors.amber}
export function getGreen(){return colors.green}
export function getRed(){return colors.red}
export function getBlue(){return colors.blue}
export function getLight(){return '#ffffff'}
export function getDark(){return '#0c1720'}
export function getDemoMode(){return true}
export function getPageName(){return '3D ULPIN GENERATION & VERTICAL PROPERTY MAPPING'}
export function getProblem(){return 'SIH26011'}
export function getTeam(){return 'CIPHER CORE'}
export function getTheme(){return 'SMART AUTOMATION'}
export function getCopyright(){return 'CIPHER CORE · SIH 2026'}
export function getEntityStack(){return ['LAND PARCEL','BUILDING','FLOORS','PROPERTY UNITS','UNDERGROUND SPACES']}
export function getFlow(){return ['2D PARCEL','3D RECONSTRUCTION','VERTICAL SEGMENTATION','3D ULPIN','SPATIAL VALIDATION','OFFICER VERIFICATION']}
export function getMapLayers(){return layerNames()}
export function getCoordinateSystem(){return 'WGS 84'}
export function getDataVersion(){return 'DEMO DATASET 2026.08'}
export function getEnvironment(){return 'LOCAL / MOCK API'}
export function getReady(){return true}
export function getSelected(){return selectedUnit}
export function getSelectedHash(){return selectedUnit.volumetricHash}
export function getSelectedTag(){return selectedUnit.verticalTag}
export function getSelectedFloorNumber(){return selectedUnit.floor}
export function getSelectedArea(){return selectedUnit.area}
export function getSelectedConfidence(){return selectedUnit.confidence}
export function getIdentityString(){return identity(selectedUnit)}
export function getParcelId(){return demoParcel.id}
export function getBuildingId(){return demoParcel.building.id}
export function getUnitId(){return selectedUnit.id}
export function getUrlId(){return 'TN09-10821'}
export function getSearchTerms(){return ['TN09-10821','A03','13.0827, 80.2707']}
export function getDemoUnits(){return 20}
export function getDemoFloors(){return 5}
export function getDemoBasements(){return 2}
export function getDemoParcels(){return 8}
export function getDemoRoads(){return 3}
export function getDemoUtilities(){return 4}
export function getDemoSurveyPoints(){return 9}
export function getDemoCoverage(){return '86%'}
export function getDemoDensity(){return '12 pts/m²'}
export function getDemoValidation(){return '6 / 6'}
export function getDemoConflict(){return '1'}
export function getDemoConfidence(){return '94.8%'}
export function getDemoLastRun(){return '08:42:16 IST'}
export function getDemoDate(){return '31 AUG 2026'}
export function getDemoOperator(){return 'OPERATOR 04'}
export function getDemoRegion(){return 'BENGALURU URBAN'}
export function getDemoSurveyId(){return 'GNSS-CRS-01482'}
export function getDemoSpatialRef(){return 'EPSG:4326'}
export function getDemoStatus(){return 'READY FOR DEMONSTRATION'}
export function getDemoMessage(){return 'Synthetic survey data loaded. Replace mock services with FastAPI / PostGIS adapters when available.'}
export function getCta(){return 'OPEN 3D EXPLORER'}
export function getSection(){return 'OPERATIONAL OVERVIEW'}
export function getSystem(){return 'SPATIAL OPERATIONS SYSTEM'}
export function getHeader(){return '3D PROPERTY INTELLIGENCE'}
export function getSubtitle(){return 'Spatial identity, vertical mapping and validation'}
export function getBreadcrumb(){return 'CITY / PARCEL / BUILDING / FLOOR 03 / UNIT A03'}
export function getShortId(){return 'A03'}
export function getLongId(){return 'TN09-10821-A03-8F32B1'}
export function getFooterNote(){return 'Prototype only — no official government identifier is issued.'}
export function getOfficialNotice(){return 'PROPOSED 3D ULPIN'}
export function getHumanNotice(){return 'HUMAN / OFFICER REVIEW'}
export function getAutoNotice(){return 'AUTOMATED EXTRACTION'}
export function getMapProvider(){return 'LOCAL VECTOR DEMO'}
export function getMapAttribution(){return 'Synthetic geometry · SIH26011'}
export function getMode(){return '3D'}
export function getView(){return 'PERSPECTIVE'}
export function getNorth(){return 'N'}
export function getUnits(){return 'METRIC'}
export function getScale(){return '1 : 2,500'}
export function getElevation(){return '+9.6 m'}
export function getGround(){return 'GROUND 0.0 m'}
export function getSelectedFloorLabel(){return 'FLOOR 03'}
export function getSelectedUnitLabel(){return 'UNIT A03'}
export function getSelectedParcelLabel(){return 'PARCEL 01'}
export function getSelectedBuildingLabel(){return 'BUILDING A'}
export function getInspection(){return 'INSPECT ENTITY'}
export function getMeasure(){return 'MEASURE'}
export function getReset(){return 'RESET CAMERA'}
export function getIsolate(){return 'ISOLATE'}
export function getReveal(){return 'REVEAL UNDERGROUND'}
export function getStack(){return 'VERTICAL STACK'}
export function getSearch(){return 'LOCATE'}
export function getLoad(){return 'LOAD DEMONSTRATION PROPERTY'}
export function getGenerate(){return 'GENERATE 3D ULPIN'}
export function getApprove(){return 'APPROVE MAPPING'}
export function getReview(){return 'SEND FOR REVIEW'}
export function getContinue(){return 'CONTINUE'}
export function getBack(){return 'BACK'}
export function getNext(){return 'NEXT STAGE'}
export function getClose(){return 'CLOSE'}
export function getOpen(){return 'OPEN'}
export function getAll(){return 'ALL'}
export function getAbove(){return 'ABOVE GROUND'}
export function getBelow(){return 'BELOW GROUND'}
export function getData(){return 'DATA'}
export function getReconstruct(){return 'RECONSTRUCT'}
export function getSegment(){return 'SEGMENT'}
export function getValidate(){return 'VALIDATE'}
export function getIdentify(){return 'IDENTIFY'}
export function getMap(){return 'MAP'}
export function getDossier(){return 'DOSSIER'}
export function getQueue(){return 'QUEUE'}
export function getConflicts(){return 'CONFLICTS'}
export function getRecords(){return 'RECORDS'}
export function getInfrastructure(){return 'INFRASTRUCTURE'}
export function getOverview(){return 'OVERVIEW'}
export function getExplorer(){return 'EXPLORER'}
export function getProperty(){return 'PROPERTY'}
export function getActive(){return 'ACTIVE'}
export function getInactive(){return 'INACTIVE'}
export function getEnabled(){return 'ENABLED'}
export function getDisabled(){return 'DISABLED'}
export function getOnline(){return 'ONLINE'}
export function getOffline(){return 'OFFLINE'}
export function getReadyLabel(){return 'READY'}
export function getMock(){return 'MOCK'}
export function getLive(){return 'LIVE'}
export function getAPI(){return 'API'}
export function getFastAPI(){return 'FASTAPI'}
export function getPostGIS(){return 'POSTGIS'}
export function getML(){return 'AI/ML PROCESSING'}
export function getReplaceNote(){return 'Replace adapters with production services later.'}
export function getArchitecture(){return ['React + TypeScript','Three.js / R3F','FastAPI adapter','PostgreSQL / PostGIS adapter','AI/ML processing adapter']}
export function getEntityNames(){return ['Parcel','Building','Floor','PropertyUnit','UndergroundStructure','SurveyPoint','ULPINIdentity','SpatialValidation','InfrastructureAsset','DataSource']}
export function getColorSystem(){return ['NAVY SHELL','BLUE ACCENT','CYAN SELECTION','AMBER STATUS','LIGHT SURFACE']}
export function getEnd(){return true}
export default demoParcel
